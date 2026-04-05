/**
 * Shared motion tokens. Keep `:root` duration vars in styles/variables.js aligned.
 * CommonJS so `src/config.js` can require() this file in Node without transpilation.
 */
module.exports = {
  motionEasing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  motionDurationEnterMs: 300,
  motionDurationScrollRevealMs: 500,
};
