import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title, description, image }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
          }
        }
      }
    `,
  );

  const { defaultTitle, defaultDescription, siteUrl, defaultImage, twitterUsername } =
    site.siteMetadata;

  const pathFromProp = image !== null && image !== undefined ? image : defaultImage;
  const hasImage = typeof pathFromProp === 'string' && pathFromProp.trim().length > 0;
  const imagePath = hasImage
    ? pathFromProp.startsWith('/')
      ? pathFromProp
      : `/${pathFromProp}`
    : '';

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: hasImage ? `${siteUrl}${imagePath}` : null,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang="en" />

      <meta name="description" content={seo.description} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.image ? <meta property="og:image" content={seo.image} /> : null}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content={hasImage ? 'summary_large_image' : 'summary'} />
      {twitterUsername ? <meta name="twitter:creator" content={twitterUsername} /> : null}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image ? <meta name="twitter:image" content={seo.image} /> : null}
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
};
