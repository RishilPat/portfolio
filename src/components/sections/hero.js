import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, fadeTransitionMs } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--heading-accent);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: color-mix(in srgb, var(--text-bright) 42%, var(--text-muted) 58%);
    line-height: 1.08;
    font-weight: 500;
  }

  .hero-name-signature {
    color: var(--text-bright);
  }

  @media (prefers-reduced-motion: no-preference) {
    @keyframes heroNameGradient {
      0%,
      100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    .hero-name-signature {
      background-image: linear-gradient(
        90deg,
        var(--text-bright) 0%,
        var(--accent) 42%,
        var(--text-bright) 84%
      );
      background-size: 220% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: heroNameGradient 12s var(--easing) infinite;
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      site {
        siteMetadata {
          title
          tagline
          heroBio
          heroRoleClosing
        }
      }
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              url
            }
          }
        }
      }
    }
  `);

  const { title, tagline, heroBio, heroRoleClosing } = data.site.siteMetadata;
  const currentJob = data.jobs.edges[0]?.node?.frontmatter;

  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading hero-name-signature">{title}.</h2>;
  const three = <h3 className="big-heading">{tagline}</h3>;
  const four = currentJob ? (
    <p>
      {heroBio} I&apos;m a {currentJob.title} at{' '}
      <a href={currentJob.url} target="_blank" rel="noreferrer">
        {currentJob.company}
      </a>{' '}
      in {currentJob.location}, {heroRoleClosing}
    </p>
  ) : (
    <p>{heroBio}</p>
  );
  const five = (
    <a className="email-link" href="/#contact">
      Get in touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={fadeTransitionMs}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
