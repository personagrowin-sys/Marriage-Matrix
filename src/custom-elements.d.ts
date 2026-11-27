import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'media-id'?: string;
          aspect?: string | number;
          autoplay?: boolean | string;
          'silent-autoplay'?: boolean | string;
          muted?: boolean | string;
          playsinline?: boolean | string;
        },
        HTMLElement
      >;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'media-id'?: string;
          aspect?: string | number;
          autoplay?: boolean | string;
          'silent-autoplay'?: boolean | string;
          muted?: boolean | string;
          playsinline?: boolean | string;
        },
        HTMLElement
      >;
    }
  }
}
