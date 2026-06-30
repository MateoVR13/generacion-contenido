/* ===========================================================================
   Plantilla SCORM — Configuración de tema (Academic Kinetic).
   Fuente única de los design tokens. Cargar antes de procesar clases Tailwind.
   =========================================================================== */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-variant": "#e4e2e4",
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed": "#231a00",
        "on-primary-container": "#808d60",
        "secondary-fixed": "#c0f500",
        "secondary": "#4f6600",
        "surface-tint": "#57633a",
        "primary": "#060b00",
        "inverse-primary": "#becc9a",
        "primary-fixed": "#dae9b4",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f5",
        "on-secondary-fixed-variant": "#3b4d00",
        "primary-fixed-dim": "#becc9a",
        "on-primary-fixed": "#151f01",
        "surface": "#fbf8fb",
        "on-tertiary-container": "#4e3d00",
        "inverse-surface": "#303032",
        "on-secondary-container": "#526b00",
        "secondary-container": "#bdf200",
        "surface-dim": "#dbd9dc",
        "tertiary-fixed-dim": "#efc100",
        "on-primary-fixed-variant": "#3f4b24",
        "outline-variant": "#c6c8ba",
        "on-secondary-fixed": "#161f00",
        "on-tertiary-fixed-variant": "#574500",
        "inverse-on-surface": "#f2f0f2",
        "surface-container-highest": "#e4e2e4",
        "on-surface": "#1b1b1d",
        "on-background": "#1b1b1d",
        "surface-container": "#efedef",
        "outline": "#76786c",
        "surface-container-high": "#eae7ea",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "surface-bright": "#fbf8fb",
        "tertiary-container": "#cea600",
        "background": "#fbf8fb",
        "on-secondary": "#ffffff",
        "error-container": "#ffdad6",
        "on-primary": "#ffffff",
        "tertiary-fixed": "#ffe086",
        "tertiary": "#735c00",
        "secondary-fixed-dim": "#a8d700",
        "primary-container": "#1a2403",
        "error": "#ba1a1a",
        "on-surface-variant": "#46483e"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "gutter": "24px",
        "xl": "80px",
        "sm": "12px",
        "md": "24px",
        "base": "8px",
        "lg": "48px",
        "xs": "4px",
        "sidebar": "300px"
      },
      height: {
        "banner": "88px"
      },
      minHeight: {
        "banner": "88px"
      },
      maxWidth: {
        "container-max": "1200px"
      },
      fontFamily: {
        "label-caps": ["Montserrat"],
        "h1": ["Montserrat"],
        "code": ["JetBrains Mono"],
        "body-md": ["Inter"],
        "body-lg": ["Inter"],
        "h1-mobile": ["Montserrat"],
        "h3": ["Montserrat"],
        "h2": ["Montserrat"]
      },
      fontSize: {
        "label-caps": ["12px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "700" }],
        "h1": ["54px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "800" }],
        "code": ["14.5px", { lineHeight: "1.5", fontWeight: "500" }],
        "body-md": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-lg": ["20px", { lineHeight: "1.65", fontWeight: "400" }],
        "h1-mobile": ["36px", { lineHeight: "1.2", fontWeight: "800" }],
        "h3": ["31px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "h2": ["38px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        // Tamaños base usados por la prosa del SCORM. Subidos para dar más cuerpo a los párrafos
        // y mayor distinción frente a los rótulos en mayúscula (label-caps, 12px).
        "xs": ["13px", { lineHeight: "1.5" }],
        "sm": ["16px", { lineHeight: "1.6" }],
        "base": ["18px", { lineHeight: "1.6" }],
        "lg": ["20px", { lineHeight: "1.6" }]
      }
    }
  }
};
