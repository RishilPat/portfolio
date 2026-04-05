import { css } from 'styled-components';
import { motionDurationEnterMs, motionDurationScrollRevealMs } from '../utils/motion';

const variables = css`
  :root {
    --bg-deepest: #0a0e1a;
    --bg-base: #111827;
    --surface-raised: #1f2937;
    --surface-muted: #374151;
    --shadow-soft: rgba(8, 15, 35, 0.78);
    --scrollbar-thumb: #6b7280;
    --text-secondary: #9ca3af;
    --text-muted: #d1d5db;
    --text-bright: #e5e7eb;
    --text-code: #f9fafb;
    --accent: #60a5fa;
    --accent-tint: rgba(251, 113, 133, 0.14);
    --heading-accent: rgb(108, 247, 136);
    --heading-accent-tint: rgba(245, 158, 11, 0.12);
    --accent-pink: #a78bfa;
    --accent-blue: #93c5fd;

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --motion-duration-enter: ${motionDurationEnterMs}ms;
    --motion-duration-scroll-reveal: ${motionDurationScrollRevealMs}ms;
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
