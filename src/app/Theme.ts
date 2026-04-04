// Theme - Moody Michelin-inspired color palette
export const colors = {
  // Primary - Deep moody background
  background: '#0a0a0a',      // Nearly black, warm tone
  surface: '#141414',         // Dark gray for cards/sections
  surfaceLight: '#1e1e1e',    // Lighter surface for hover states

  // Accents - Gold/Metallic for elegance
  gold: '#c5a466',            // Primary gold accent
  goldLight: '#d4b484',       // Lighter gold for highlights
  goldDark: '#9e7d4b',        // Darker gold for contrast

  // Text
  textPrimary: '#f5f5f5',     // Off-white for primary text
  textSecondary: '#cfcfcf',   // Muted gray for secondary text
  textMuted: '#a0a0a0',       // Lighter gray for hints

  // Borders
  border: '#2a2a2a',          // Subtle border
  borderDark: '#1a1a1a',      // Very subtle border
};

export const typography = {
  fontFamily: {
    serif: 'Helvetica, Arial, sans-serif',
    sans: 'Helvetica, Arial, sans-serif',
    display: 'Helvetica, Arial, sans-serif',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const spacing = {
  section: '8rem',
  container: '1200px',
};

export const transitions = {
  standard: 'all 0.3s ease-in-out',
  smooth: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
};
