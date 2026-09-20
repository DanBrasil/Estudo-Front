/**
 * Fonte unica de verdade para tokens visuais.
 * Nenhum componente deve declarar cor, fonte ou espacamento literal:
 * sempre via props.theme.
 */
export const theme = {
  colors: {
    background: '#0f1115',
    surface: '#181b22',
    surfaceHover: '#1f232c',
    border: '#2a2f3a',
    textPrimary: '#f2f4f8',
    textSecondary: '#9aa3b2',
    primary: '#4f8cff',
    primaryHover: '#6a9eff',
    success: '#2ecc71',
    danger: '#ff5f5f',
    warning: '#f5b342',
  },
  fonts: {
    body: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const

export type AppTheme = typeof theme
