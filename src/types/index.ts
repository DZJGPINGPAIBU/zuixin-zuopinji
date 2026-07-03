export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  color?: string;
  featured?: boolean;
}

export interface ThemeColor {
  name: string;
  bg: string;
  accent: string;
  text: string;
}

// Spline viewer custom element type
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          'events-target'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export const THEME_COLORS: ThemeColor[] = [
  { name: 'light', bg: '#FAF8F5', accent: '#D4563C', text: '#1C1C1E' },
  { name: 'dark', bg: '#1C1C1E', accent: '#D4563C', text: '#FAF8F5' },
];
