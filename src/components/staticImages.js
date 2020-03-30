import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const useStaticImages = () =>
  // Prepare necessary static gatsby images because static query has to be hardcoded.
  // One static query is allowed per file.
  // Actually it would be better to query inside a page file instead of here.
  useStaticQuery(graphql`
    query {
      logoImage: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      hanareSignImage: file(relativePath: { eq: "hanare-sign.jpg" }) {
        childImageSharp {
          fixed(width: 300, height: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      hanareOwnerImage: file(relativePath: { eq: "hanare-owner.jpg" }) {
        childImageSharp {
          fixed(width: 300, height: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

export const LogoImage = () => (
  <GatsbyImage fluid={useStaticImages().logoImage.childImageSharp.fluid} />
);

export const HanareSignImage = () => (
  <GatsbyImage
    fixed={useStaticImages().hanareSignImage.childImageSharp.fixed}
  />
);

export const HanareOwnerImage = () => (
  <GatsbyImage
    fixed={useStaticImages().hanareOwnerImage.childImageSharp.fixed}
  />
);
