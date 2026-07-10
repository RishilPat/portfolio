import { css } from 'styled-components';

// https://reactcommunity.org/react-transition-group/css-transition
// Base rules = full motion (covers browsers without prefers-reduced-motion support).

const TransitionStyles = css`
  .fadeup-enter {
    opacity: 0.01;
    transform: translate3d(0, 20px, 0);
    transition: opacity var(--duration-enter) var(--easing),
      transform var(--duration-enter) var(--easing);
  }

  .fadeup-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: opacity var(--duration-enter) var(--easing),
      transform var(--duration-enter) var(--easing);
  }

  .fadedown-enter {
    opacity: 0.01;
    transform: translate3d(0, -20px, 0);
    transition: opacity var(--duration-enter) var(--easing),
      transform var(--duration-enter) var(--easing);
  }

  .fadedown-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: opacity var(--duration-enter) var(--easing),
      transform var(--duration-enter) var(--easing);
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transition: opacity var(--duration-enter) var(--easing);
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity var(--duration-enter) var(--easing);
  }

  @media (prefers-reduced-motion: reduce) {
    .fadeup-enter,
    .fadeup-enter-active,
    .fadedown-enter,
    .fadedown-enter-active {
      transform: none;
    }

    .fadeup-enter,
    .fadedown-enter {
      opacity: 0;
    }

    .fadeup-enter-active,
    .fadedown-enter-active {
      opacity: 1;
      transition: opacity 1ms linear;
    }

    .fade-enter-active,
    .fade-exit-active {
      transition: opacity 1ms linear;
    }
  }
`;

export default TransitionStyles;
