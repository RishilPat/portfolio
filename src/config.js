/**
 * Site copy and URLs — single source of truth. `gatsby-config.js` maps `site`
 * into `siteMetadata` so SEO and React components can share the same strings.
 * Keep `package.json` "author" aligned with `site.title` for npm metadata.
 */
const { motionEasing, motionDurationScrollRevealMs } = require('./utils/motion');

module.exports = {
  site: {
    title: 'Rishil Patel',
    description:
      'Computer Engineering and Computer Science student at Northeastern University. Software engineering, embedded systems, and test and measurement.',
    siteUrl: 'https://rishilp.com',
    /** Set to e.g. '/og.png' when the file exists in static/; leave empty to omit social preview images. */
    image: '',
    twitterUsername: '',
    tagline: 'Computer Engineering & Computer Science student.',
    /** Opening hero paragraph (before the current-role sentence from jobs markdown). */
    heroBio:
      'I am a junior at Northeastern exploring the intersection of software and hardware. Currently, ', // this will be followed by job
    /** Follows job title, company link, and location in the hero. */
    heroRoleClosing: 'building and testing software for electronic test and measurement products.',
    /**
     * About section lead — deeper than hero: how you think, what you optimize for, what you want next.
     * Skip repeating school, tagline, or job (those live in hero + Education below).
     */
    aboutLead:
      'I care most about software that has to be right next to hardware: test and measurement, embedded bring-up, and tooling that makes validation faster and less ambiguous. I like working across that boundary—turning specs and lab reality into code people trust.',
    githubRepo: 'https://github.com/RishilPat/portfolio',
  },

  /** Shown in the UI; not a raw address (reduces scraping). */
  emailObfuscated: 'work (at) rishilp (dot) com',

  /** Assembled at runtime for mailto links only. */
  emailMailto() {
    return `mailto:${'work'}@${'rishilp.com'}`;
  },

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/RishilPat',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/rishilpat',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  /** Hex mirrors :root tokens in src/styles/variables.js (build-time plugins, e.g. traced SVG). */
  colors: {
    accent: '#fb7185',
    headingAccent: '#f59e0b',
    bgBase: '#111827',
    bgDeepest: '#0a0e1a',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: motionDurationScrollRevealMs,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: motionEasing,
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
