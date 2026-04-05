# Portfolio site

Personal portfolio for Rishil Patel, built with [Gatsby](https://www.gatsbyjs.org/). Site content lives in `gatsby-config.js`, `src/config.js`, and `content/`.

Design and implementation are based on [bchiang7/v4](https://github.com/bchiang7/v4) by Brittany Chiang — see [LICENSE](LICENSE) for the MIT license and copyright notices.

## Installation and development

1. Install the Gatsby CLI (optional): `npm install -g gatsby-cli`
2. Use a compatible Node version (see `.nvmrc` if present)
3. Install dependencies: `npm install` or `yarn`
4. Start the dev server: `npm start`

## Production build

```sh
npm run build
npm run serve
```

## Customize

- **Site metadata & PWA names:** `gatsby-config.js`
- **Email and social links:** `src/config.js`
- **Hero, about, contact:** `src/components/sections/`
- **Footer GitHub repo** (stars/forks API): `src/components/footer.js` — uses `RishilPat/portfolio`
- **Projects, jobs, posts, featured:** `content/`
- **About photo:** replace `src/images/demo.png` reference in `src/components/sections/about.js` or add your own image under `src/images/`
- **Open Graph image:** replace `static/og.png` (and `og@2x.png` if used) with your branding
