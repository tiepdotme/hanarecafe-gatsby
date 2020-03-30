import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Card, Grid, Message } from 'semantic-ui-react';
import Media from 'react-media';
import GatsbyImage from 'gatsby-image';

import PageHelmet from '../components/PageHelmet';
import Layout from '../components/Layout';
import AppContentContainer from '../components/AppContentContainer';
import useSiteMetadata from '../components/useSiteMetadata';

// Page title and description should be defined in the translation files.
// The markdown content will be an info message.
export function CardsPageTemplate({
  content,
  mainImage,
  mainImageActive,
  cards = [],
}) {
  const { pageTitle, pageDescription } = useSiteMetadata();

  return (
    <AppContentContainer>
      <PageHelmet />

      <section style={{ marginBottom: '2rem' }}>
        <h1>{pageTitle}</h1>
        <p>{pageDescription}</p>
        {content && (
          <Message color="yellow" size="big" style={{ marginTop: '1rem' }}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Message>
        )}
        {mainImageActive && (
          <GatsbyImage
            fluid={mainImage.childImageSharp.fluid}
            style={{ maxHeight: '600px' }}
          />
        )}
      </section>

      <Media query={{ maxWidth: 599 }}>
        {(matches) =>
          matches ? (
            // For mobile, each card takes full width.
            cards.map(({ image, title, mainImage }) => {
              const imageUrl = !!image.childImageSharp
                ? image.childImageSharp.fluid.src
                : image;
              return (
                <Card
                  key={imageUrl}
                  image={imageUrl}
                  header={title}
                  mainImage={mainImage}
                  fluid
                />
              );
            })
          ) : (
            // For larger devices, switch column count per row.
            <Grid doubling columns={5}>
              {cards.map(({ image, title, mainImage }) => {
                const imageUrl = !!image.childImageSharp
                  ? image.childImageSharp.fluid.src
                  : image;
                return (
                  <Grid.Column key={imageUrl}>
                    <Card
                      image={imageUrl}
                      header={title}
                      mainImage={mainImage}
                    />
                  </Grid.Column>
                );
              })}
            </Grid>
          )
        }
      </Media>
    </AppContentContainer>
  );
}

CardsPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  mainImage: PropTypes.string,
  mainImageActive: PropTypes.bool,
  cards: PropTypes.array,
};

function CardsPage({ data: { markdownRemark } }) {
  return (
    <Layout>
      <CardsPageTemplate
        content={markdownRemark.html}
        mainImage={markdownRemark.frontmatter.mainImage}
        mainImageActive={markdownRemark.frontmatter.mainImageActive}
        cards={markdownRemark.frontmatter.cards}
      />
    </Layout>
  );
}

CardsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default CardsPage;

export const pageQuery = graphql`
  query CardsPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        mainImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainImageActive
        cards {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 600, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
