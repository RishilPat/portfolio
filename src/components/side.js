import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { fadeTransitionMs } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledSideElement = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: ${props => (props.orientation === 'left' ? 'var(--page-gutter-x)' : 'auto')};
  right: ${props => (props.orientation === 'left' ? 'auto' : 'var(--page-gutter-x)')};
  z-index: 10;
  color: var(--text-muted);

  /*
   * Below this width, the hero/section content column sits flush against the same
   * gutter as this sidebar (no horizontal separation), so it can collide with hero
   * text at any viewport height. Above it, the content column re-centers itself
   * with growing horizontal clearance, and height no longer matters.
   */
  @media (max-width: 1340px) {
    display: none;
  }
`;

const Side = ({ children, isHome, orientation }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isHome || prefersReducedMotion) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledSideElement orientation={orientation}>
      {prefersReducedMotion ? (
        <>{children}</>
      ) : (
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition
              classNames={isHome ? 'fade' : ''}
              timeout={isHome ? fadeTransitionMs : 0}>
              {children}
            </CSSTransition>
          )}
        </TransitionGroup>
      )}
    </StyledSideElement>
  );
};

Side.propTypes = {
  children: PropTypes.node.isRequired,
  isHome: PropTypes.bool,
  orientation: PropTypes.string,
};

export default Side;
