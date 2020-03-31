import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import {
  Button,
  Container,
  Header,
  Icon,
  List,
  Message,
  Segment,
} from 'semantic-ui-react';
import Media from 'react-media';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import GatsbyImage from 'gatsby-image';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout';
import MarkdownBody from '../components/MarkdownBody';
import FacebookTimeline from '../components/FacebookTimeline';
import HanareDirections from '../components/HanareDirections';
import HanareIntroVideo from '../components/HanareIntroVideo';
import HanareServiceList from '../components/HanareServiceList';
import { LogoImage } from '../components/staticImages';
import { getCurrentLanguage } from '../lib/i18nUtils';

function AppHero({ backgroundImageUrl }) {
  return (
    <Media query={{ maxWidth: 991 }}>
      {(matches) => (
        <div
          style={{
            alignItems: `center`,
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundPosition: `50% 50%`,
            backgroundAttachment: `fixed`,
            display: `flex`,
            justifyContent: `center`,
            height: matches ? '300px' : '400px',
          }}
        >
          <div style={{ width: matches ? '200px' : '300px' }}>
            <LogoImage />
          </div>
        </div>
      )}
    </Media>
  );
}

function SeparatorWithBackgroundImage({
  backgroundImageUrl,
  height,
  width,
  ...rest
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundPosition: `50% 50%`,
        backgroundAttachment: `fixed`,
        width: width || '100%',
        height: height || '16px',
      }}
      {...rest}
    />
  );
}

// Used for the website and the CMS.
export function IndexPageTemplate({
  markdownBody,
  isCms = false,
  mainBackgroundImage,
  mainImage,
  relatedLinks,
}) {
  const { t, i18n } = useTranslation();
  const backgroundImageUrl = !!mainBackgroundImage.childImageSharp
    ? mainBackgroundImage.childImageSharp.fluid.src
    : mainBackgroundImage;

  return (
    <>
      <AppHero backgroundImageUrl={backgroundImageUrl} />

      <Container style={{ display: 'flex' }}>
        <div>
          <Message color="yellow" size="big" style={{ marginTop: '1rem' }}>
            <MarkdownBody markdownBody={markdownBody} isCms={isCms} />

            {/* For mobile, show the link to Facebook timeline page. */}
            <Media
              query="(max-width: 991px)"
              render={() => (
                <Button
                  primary
                  icon
                  labelPosition="right"
                  as={Link}
                  to="/timeline"
                >
                  <Icon name="angle right" />
                  {t('headings.latest-news')}
                </Button>
              )}
            />
          </Message>
          <Segment
            padded
            vertical
            textAlign="left"
            style={{ fontSize: '1.7rem', lineHeight: '1.7', overflowX: 'auto' }}
          >
            {/* Inline custom styles for Japanese language only. */}
            {getCurrentLanguage(i18n) === 'ja' ? (
              <>
                絶景観光スポット
                <OutboundLink href="https://ja.wikipedia.org/wiki/%E7%AD%94%E5%BF%97%E5%B3%B6">
                  答志島
                </OutboundLink>
                にある
                <br />
                地元食材を使用した
                <br />
                焼きたて創作パンのお店です。
              </>
            ) : (
              t('site.description')
            )}
          </Segment>
          <GatsbyImage fluid={mainImage.childImageSharp.fluid} />
          <HanareIntroVideo />
          <Segment padded="very" vertical>
            <Header as="h2">{t('headings.services')}</Header>
            <HanareServiceList />
          </Segment>
          <SeparatorWithBackgroundImage
            backgroundImageUrl={backgroundImageUrl}
          />
          <Segment padded="very" vertical>
            <Header as="h2">{t('headings.directions')}</Header>
            <HanareDirections />
          </Segment>
          <SeparatorWithBackgroundImage
            backgroundImageUrl={backgroundImageUrl}
          />
          {relatedLinks.length > 0 && (
            <Segment padded="very" vertical>
              <Header as="h2">{t('headings.links')}</Header>
              <List>
                {relatedLinks.map((relatedLink, i) => (
                  <List.Item key={i}>
                    <OutboundLink href={relatedLink.href}>
                      {relatedLink.title}
                    </OutboundLink>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
        </div>

        <aside>
          {/* For desktop, show the Facebook sidebar. */}
          <Media
            query="(min-width: 992px)"
            render={() => (
              <div style={{ marginLeft: '1rem' }}>
                <FacebookTimeline title="FacebookTimeline-desktop" />
              </div>
            )}
          />
        </aside>
      </Container>
    </>
  );
}

IndexPageTemplate.propTypes = {
  markdownBody: PropTypes.node.isRequired,
  isCms: PropTypes.bool.isRequired,
  mainBackgroundImage: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  mainImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  relatedLinks: PropTypes.array,
};

// Used for the website.
function IndexPage({ data: { markdownRemark } }) {
  return (
    <Layout>
      <IndexPageTemplate
        markdownBody={markdownRemark.html}
        isCms={false}
        mainBackgroundImage={markdownRemark.frontmatter.mainBackgroundImage}
        mainImage={markdownRemark.frontmatter.mainImage}
        relatedLinks={markdownRemark.frontmatter.relatedLinks}
      />
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        mainBackgroundImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        relatedLinks {
          title
          href
        }
      }
    }
  }
`;
