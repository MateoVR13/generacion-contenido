/* =====================================================================
   test-renderer.js — test Node (sin navegador) del renderer.
   Ejecutar:  node template/test/test-renderer.js
   Comprueba: render por página, regla de output 100% inline (sin
   <script>/<style>/<link>), escape de texto, subconjunto rich y saneo de URLs.
   ===================================================================== */
'use strict';
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var R = require(path.join(__dirname, '..', 'assets', 'renderer.js'));
var sample = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'ejemplo-moodle.json'), 'utf8')
);

var failures = 0;
function ok(name, fn) {
  try { fn(); console.log('  ✓ ' + name); }
  catch (e) { failures++; console.log('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('renderAll() — firma y páginas');

// 1) renderAll devuelve una entrada por página, en orden de pageOrder.
// El conteo y los ids se derivan del propio JSON, no se hardcodean, para que el
// test no se rompa al cambiar el ejemplo (welcome + N momentos + closing).
var expectedOrder = sample.moodle.pageOrder;
var pages = R.renderAll(sample);
ok('devuelve una página por entrada de pageOrder, en orden', function () {
  assert.strictEqual(pages.length, expectedOrder.length);
  assert.deepStrictEqual(pages.map(function (p) { return p.id; }), expectedOrder);
});
ok('cada página tiene {id,type,title,html}', function () {
  pages.forEach(function (p) {
    assert.ok(p.id && p.type && p.title && typeof p.html === 'string' && p.html.length > 0);
  });
});
ok('tipos de página coinciden con el JSON (welcome al inicio, closing al final, moment en medio)', function () {
  // Cada página renderizada debe tener el mismo type que el declarado en el JSON.
  pages.forEach(function (p) {
    assert.strictEqual(p.type, sample.moodle.pages[p.id].type);
  });
  assert.strictEqual(pages[0].type, 'welcome');
  assert.strictEqual(pages[pages.length - 1].type, 'closing');
  assert.ok(pages.some(function (p) { return p.type === 'moment'; }), 'debe haber al menos una página moment');
});

// 2) acepta tanto {moodle:{...}} como el objeto moodle directo.
ok('acepta el objeto moodle directo (sin wrapper)', function () {
  var p2 = R.renderAll(sample.moodle);
  assert.strictEqual(p2.length, expectedOrder.length);
});

// 3) renderPage individual sobre la primera página moment del ejemplo.
ok('renderPage(page, ctx) devuelve HTML de una página', function () {
  var firstMomentId = expectedOrder.filter(function (id) {
    return sample.moodle.pages[id].type === 'moment';
  })[0];
  var page = sample.moodle.pages[firstMomentId];
  var html = R.renderPage(page, { moodle: sample.moodle });
  assert.ok(typeof html === 'string' && html.length > 0);
  // El banner del momento debe reflejar el nombre del momento del JSON.
  assert.ok(html.indexOf(page.momentName) !== -1, 'el HTML debe contener el momentName');
});

console.log('\nRegla de output: 100% inline, sin JS/CSS externo');
var allHtml = pages.map(function (p) { return p.html; }).join('\n');

ok('no contiene <script>', function () {
  assert.strictEqual(/<script/i.test(allHtml), false);
});
ok('no contiene <style>', function () {
  assert.strictEqual(/<style/i.test(allHtml), false);
});
ok('no contiene <link>', function () {
  assert.strictEqual(/<link/i.test(allHtml), false);
});
ok('no contiene atributos on*= (handlers JS)', function () {
  assert.strictEqual(/\son[a-z]+\s*=/i.test(allHtml), false);
});
ok('no contiene javascript: en URLs', function () {
  assert.strictEqual(/javascript:/i.test(allHtml), false);
});
ok('usa estilos inline (style=)', function () {
  assert.ok(/style="/.test(allHtml));
});
ok('usa el acento lima unificado #c0f500', function () {
  assert.ok(allHtml.indexOf('#c0f500') !== -1);
});
ok('NO usa el dorado original #e6b400 (se unificó a lima)', function () {
  assert.strictEqual(allHtml.indexOf('#e6b400'), -1);
});

console.log('\nEscape y subconjunto rich');
ok('escapa texto plano (XSS en title)', function () {
  var html = R.renderPage({
    type: 'welcome',
    components: [{ type: 'hero', title: '<img src=x onerror=alert(1)>', description: 'ok' }]
  }, { moodle: { branding: {}, course: {} } });
  // El payload debe quedar como TEXTO escapado, no como un <img> vivo.
  assert.strictEqual(/<img\s+src=x/i.test(html), false);
  assert.ok(html.indexOf('&lt;img src=x onerror=alert(1)&gt;') !== -1);
});
ok('richInline permite <em>/<strong> y descarta lo demás', function () {
  var out = R.richInline('Texto <em>cursiva</em> <strong>negrita</strong> <script>mal()</script>');
  assert.ok(out.indexOf('<em>cursiva</em>') !== -1);
  assert.ok(out.indexOf('<strong>negrita</strong>') !== -1);
  assert.strictEqual(/<script/i.test(out), false);
});
ok('richInline permite <a href> seguro y bloquea javascript:', function () {
  var good = R.richInline('<a href="https://ua.edu">link</a>');
  assert.ok(good.indexOf('<a href="https://ua.edu"') !== -1);
  var bad = R.richInline('<a href="javascript:alert(1)">x</a>');
  assert.strictEqual(/javascript:/i.test(bad), false);
});
ok('safeUrl bloquea esquemas peligrosos', function () {
  assert.strictEqual(R.safeUrl('javascript:alert(1)'), '');
  assert.strictEqual(R.safeUrl('data:text/html,x'), '');
  assert.ok(R.safeUrl('https://ua.edu').length > 0);
  assert.ok(R.safeUrl('ejemplo-moodle.json').length > 0);
});

console.log('\nCobertura de componentes del inventario');
var inventory = [
  'hero', 'learning-outcomes', 'activities', 'roadmap', 'course-glance', 'resources', 'footer',
  'moment-banner', 'moment-intro', 'scorm-link', 'practice-link', 'complementary',
  'closing-hero', 'summary', 'next-steps', 'final-evaluation'
];
ok('los 16 componentes del inventario están implementados', function () {
  inventory.forEach(function (t) {
    assert.ok(typeof R.COMPONENTS[t] === 'function', 'falta componente: ' + t);
  });
});
ok('cada componente renderiza sin lanzar (smoke con datos mínimos)', function () {
  var pageCtx = {
    branding: {},
    course: { title: 'X', methodology: { name: 'AG' } },
    momentLabelSingular: 'Momento',
    momentNumber: '1'
  };
  inventory.forEach(function (t) {
    var html = R.renderComponent(
      { type: t, title: t, href: 'https://x.com', embedUrl: 'https://x.com', items: [] },
      pageCtx
    );
    assert.ok(typeof html === 'string', 'componente ' + t + ' no devolvió string');
  });
});

console.log('\n' + (failures === 0
  ? 'TODOS LOS TESTS PASARON ✅'
  : (failures + ' TEST(S) FALLARON ❌')));
process.exit(failures === 0 ? 0 : 1);
