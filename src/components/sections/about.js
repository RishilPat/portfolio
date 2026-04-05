import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1260px;
  width: 100%;

  .inner {
    min-width: 0;

    & > * {
      min-width: 0;
    }
  }
`;
const StyledText = styled.div`
  min-width: 0;
`;

const StyledEducationBody = styled.p`
  margin: 0;
  line-height: 1.55;
`;

const StyledEducationMeta = styled.p`
  margin: 0.45rem 0 0 0;
  font-size: var(--fz-sm);
  line-height: 1.45;
  color: var(--text-secondary);
`;

/** Right-to-left infinite scroll (content moves toward the left) */
const tagScrollRTL = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const StyledSkillsRegion = styled.div`
  position: relative;
  margin-top: 1.25rem;
  min-width: 0;
  width: 100%;
`;

const VisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const StyledSkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1rem;
  row-gap: 1.2rem;
  align-items: stretch;
  min-width: 0;
  width: 100%;
  overflow: visible;

  /* Second “shelf” — slight horizontal offset (2×2 only) */
  @media (min-width: 381px) {
    & > *:nth-child(3),
    & > *:nth-child(4) {
      transform: translateX(clamp(0.85rem, 5vw, 2.5rem));
    }
  }

  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
`;

const StyledSkillCategory = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: 100%;
  border: 1px solid var(--surface-muted);
  border-radius: var(--border-radius);
  background-color: var(--surface-raised);
  padding: 0.78rem 0.6rem 0.85rem;
  overflow: hidden;
  box-shadow: 3px 4px 0 0 var(--shadow-soft);
`;

const CategoryHeading = styled.h3.attrs({ className: 'subsection-heading skill-category-heading' })`
  flex-shrink: 0;
  margin: 0 0 0.5rem 0;
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

const SkillTag = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0.52rem 1rem;
  font-family: var(--font-mono);
  font-size: clamp(var(--fz-xs), 1.15vw, var(--fz-sm));
  font-weight: 500;
  letter-spacing: 0.02em;
  color: color-mix(in srgb, var(--text-bright) 78%, var(--accent) 22%);
  line-height: 1.25;
  border: 1px solid color-mix(in srgb, var(--accent) 48%, var(--surface-muted));
  border-radius: 999px;
  background: linear-gradient(
    165deg,
    color-mix(in srgb, var(--accent) 22%, var(--bg-base)) 0%,
    color-mix(in srgb, var(--accent-tint), var(--bg-base)) 100%
  );
  box-shadow: 0 1px 0 color-mix(in srgb, var(--accent) 28%, transparent);
  white-space: nowrap;
  box-sizing: border-box;
`;

const TagMarqueeViewport = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  margin: 0.45rem -0.35rem 0;
  padding: 0.42rem 0.55rem;
  overflow: hidden;
  contain: layout paint;
  isolation: isolate;
  mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);

  @media (prefers-reduced-motion: reduce) {
    mask-image: none;
    -webkit-mask-image: none;
  }
`;

const TagMarqueeTrack = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: max-content;
  max-width: none;
  gap: 0.65rem;
  backface-visibility: hidden;
  animation-name: ${tagScrollRTL};
  animation-duration: ${props => props.$durationSec}s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const StaticTagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 0.45rem;
`;

const StyledCourseworkDetails = styled.details`
  margin: 1.1em 0;

  summary {
    cursor: pointer;
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.35rem 0.75rem;
    padding: 0.7rem 1rem 0.7rem 0.85rem;
    border: 1px solid color-mix(in srgb, var(--accent) 35%, var(--surface-muted));
    border-radius: var(--border-radius);
    background-color: var(--surface-raised);
    box-shadow: 0 1px 0 color-mix(in srgb, var(--accent) 12%, transparent);
    transition: border-color 0.2s var(--easing), box-shadow 0.2s var(--easing),
      background-color 0.2s var(--easing);

    &:hover {
      border-color: color-mix(in srgb, var(--accent) 55%, var(--surface-muted));
      background-color: color-mix(in srgb, var(--surface-raised) 92%, var(--accent) 8%);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 2px dashed var(--accent);
      outline-offset: 3px;
    }

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▸';
      flex-shrink: 0;
      display: inline-block;
      margin-right: 0.45em;
      font-size: 0.95em;
      color: var(--heading-accent);
      transform: rotate(0deg);
      transition: transform 0.2s var(--easing);
    }

    @media (prefers-reduced-motion: reduce) {
      &::before {
        transition: none;
      }
    }
  }

  &[open] summary {
    border-bottom: 1px solid var(--surface-muted);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: none;
  }

  &[open] summary::before {
    transform: rotate(90deg);
  }

  .coursework-summary-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.35rem 1.25rem;
    flex: 1;
    min-width: 0;
  }

  .coursework-summary-row .subsection-heading {
    margin: 0;
  }

  .coursework-hint {
    font-family: var(--font-sans);
    font-weight: 400;
    text-transform: none;
    letter-spacing: normal;
    color: var(--text-secondary);
    font-size: var(--fz-sm);
    white-space: nowrap;
  }

  .coursework-hint--open {
    display: none;
  }

  &[open] .coursework-hint--closed {
    display: none;
  }

  &[open] .coursework-hint--open {
    display: inline;
  }

  .coursework-inner {
    margin-top: 0;
    padding: 1.25rem 1.35rem;
    border: 1px solid var(--surface-muted);
    border-top: none;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    background-color: var(--surface-raised);
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem 1.75rem;
    align-items: start;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1.15rem 1.25rem;
    }

    @media (max-width: 520px) {
      grid-template-columns: 1fr;
      padding: 1.1rem 1rem;
    }
  }

  .course-group {
    margin: 0;
    min-width: 0;
    padding: 0 0.15rem;
  }

  .course-group .subsection-heading {
    margin: 0 0 0.5rem 0;
  }

  .course-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .course-list li {
    font-size: var(--fz-sm);
    line-height: 1.45;
    margin-bottom: 0.35rem;
    color: var(--text-secondary);
  }

  .course-code {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--text-muted);
    margin-right: 0.4em;
  }
`;

/** Completed courses from degree audit (codes + titles as listed). */
const COURSEWORK_BY_CATEGORY = [
  {
    title: 'Computer Science',
    courses: [
      { code: 'CS1800', name: 'Discrete Structures - with Recitation' },
      { code: 'CS2500', name: 'Fundamentals of Computer Science 1 - with Lab' },
      { code: 'CS2510', name: 'Fundamentals of Computer Science 2 - with Lab' },
      { code: 'CS3100', name: 'Object-Oriented Design' },
      { code: 'CS3650', name: 'Computer Systems' },
      { code: 'CY2550', name: 'Introduction to Cybersecurity' },
    ],
  },
  {
    title: 'Electrical / Computer Engineering',
    courses: [
      { code: 'EECE2140', name: 'Computing Fundamentals' },
      { code: 'EECE2150', name: 'Circuits & Signals' },
      { code: 'EECE2160', name: 'Embedded Design' },
      { code: 'EECE2520', name: 'Linear Systems' },
      { code: 'EECE2540', name: 'Fundamentals of Networks' },
      { code: 'EECE2750', name: 'EECE Technical Elective - Enabling Engineering' },
    ],
  },
  {
    title: 'General Engineering',
    courses: [
      { code: 'CHEM1151', name: 'Chemistry for Engineering - with Recitation' },
      { code: 'MATH1342', name: 'Calculus 2 for Engineering' },
      { code: 'MATH2341', name: 'Differential Equations / Linear Algebra' },
      { code: 'PHYS1155', name: 'Physics 2 for Engineering - with Lab and ILS' },
      { code: 'GE1501', name: 'Cornerstone 1' },
      { code: 'GE1502', name: 'Cornerstone 2' },
    ],
  },
];

const SKILL_CATEGORIES = [
  {
    id: 'languages',
    title: 'Languages',
    items: ['Python', 'C & C++', 'Java', 'MATLAB', 'Bash & PowerShell'],
  },
  {
    id: 'ai-tools',
    title: 'AI Tools',
    items: ['Cursor', 'GitHub Copilot in VSCode', 'Claude'],
  },
  {
    id: 'hardware',
    title: 'Hardware',
    items: [
      'Raspberry Pi',
      'Arduino',
      'Oscilloscope',
      'Multimeter',
      'Function Generator',
      'Circuit Design',
    ],
  },
  {
    id: 'miscellaneous',
    title: 'Miscellaneous',
    items: ['Git', 'SVN', 'Linux', 'Windows', 'Soldering'],
  },
];

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <h3 className="subsection-heading subsection-heading--large">Education</h3>
            <StyledEducationBody>
              <strong>Northeastern University</strong>, Boston, MA
              <br />
              Bachelor of Science in Computer Engineering and Computer Science
            </StyledEducationBody>
            <StyledEducationMeta>Expected May 2027 · GPA 3.98</StyledEducationMeta>

            <StyledCourseworkDetails>
              <summary>
                <span className="coursework-summary-row">
                  <span className="subsection-heading subsection-heading--large">Coursework</span>
                  <span className="coursework-hint coursework-hint--closed">
                    Show completed courses
                  </span>
                  <span className="coursework-hint coursework-hint--open">Hide list</span>
                </span>
              </summary>
              <div className="coursework-inner">
                {COURSEWORK_BY_CATEGORY.map(group => (
                  <div className="course-group" key={group.title}>
                    <div className="subsection-heading">{group.title}</div>
                    <ul className="course-list">
                      {group.courses.map(course => (
                        <li key={`${group.title}-${course.code}`}>
                          <span className="course-code">{course.code}</span>
                          {course.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </StyledCourseworkDetails>

            <h3 className="subsection-heading subsection-heading--large subsection-heading--section">
              Skills
            </h3>
          </div>

          <StyledSkillsRegion>
            {!prefersReducedMotion && (
              <VisuallyHidden>
                {SKILL_CATEGORIES.map(cat => (
                  <React.Fragment key={cat.id}>
                    <h3 className="subsection-heading">{cat.title}</h3>
                    <ul>
                      {cat.items.map(item => (
                        <li key={`${cat.id}-${item}`}>{item}</li>
                      ))}
                    </ul>
                  </React.Fragment>
                ))}
              </VisuallyHidden>
            )}

            <StyledSkillsGrid aria-hidden={!prefersReducedMotion ? true : undefined}>
              {SKILL_CATEGORIES.map(cat => {
                const durationSec = Math.max(22, 14 + cat.items.length * 5);
                const doubledTags = [...cat.items, ...cat.items];

                return (
                  <StyledSkillCategory key={cat.id}>
                    <CategoryHeading>{cat.title}</CategoryHeading>
                    {prefersReducedMotion ? (
                      <StaticTagGrid>
                        {cat.items.map(item => (
                          <SkillTag key={item}>{item}</SkillTag>
                        ))}
                      </StaticTagGrid>
                    ) : (
                      <TagMarqueeViewport>
                        <TagMarqueeTrack $durationSec={durationSec}>
                          {doubledTags.map((skill, i) => (
                            <SkillTag key={`${cat.id}-${skill}-${i}`}>{skill}</SkillTag>
                          ))}
                        </TagMarqueeTrack>
                      </TagMarqueeViewport>
                    )}
                  </StyledSkillCategory>
                );
              })}
            </StyledSkillsGrid>
          </StyledSkillsRegion>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
