import React from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
  List,
  Segment,
} from 'semantic-ui-react';
import Media from 'react-media';

import BackToTopLink from './BackToTopLink';
import useSiteMetadata from './useSiteMetadata';
import { useTranslation } from 'react-i18next';
import LogoLink from './LogoLink';
import gatsbyLogoSvg from '../img/gatsby.svg';
import logoSvg from '../img/logo-vertical.svg';

function AppFooter({ children }) {
  const { t } = useTranslation();
  const { gmap } = useSiteMetadata();

  const title = t('site.title');
  const phone = t('site.phone');
  const address = t('site.address');

  return (
    <>
      {/* The contact us section */}
      <Segment vertical padded="very" style={{ background: '#f5f6f7' }}>
        <Container>
          <Header as="h2">{t('headings.contact-us')}</Header>
          <Button basic color="teal" as="a" href={`tel:${phone}`}>
            <Icon name="phone" /> {phone}
          </Button>

          <Segment>{t('topics.contact-us.message')}</Segment>
        </Container>
      </Segment>

      {/* The footer */}
      <Media query={{ maxWidth: 991 }}>
        {(matches) => (
          <Segment as="footer" inverted vertical style={{ padding: '4rem 0' }}>
            <span
              style={{
                position: 'absolute',
                bottom: '5rem',
                right: '1rem',
                zIndex: 2,
              }}
            >
              <BackToTopLink inverted />
            </span>
            <Container
              style={{
                textAlign: `center`,
              }}
            >
              <LogoLink width="200" src={logoSvg} />
              <List as="address" link inverted>
                <List.Item>
                  <a href={gmap}>{address}</a>
                </List.Item>
                <List.Item>
                  <a href={`tel:${phone}`}>{phone}</a>
                </List.Item>
                <List.Item>
                  <List link inverted style={{ paddingLeft: 0 }}>
                    <List.Item>
                      © {new Date().getFullYear()} {title}
                    </List.Item>
                    <List.Item>
                      <span
                        style={{
                          marginRight: '0.4rem',
                          verticalAlign: 'top',
                        }}
                      >
                        Proudly built with
                      </span>
                      <a href="https://www.gatsbyjs.org/showcase/">
                        <img src={gatsbyLogoSvg} alt="GatsbyJS" height="16px" />
                      </a>
                    </List.Item>
                  </List>
                </List.Item>
              </List>
            </Container>
          </Segment>
        )}
      </Media>
    </>
  );
}

export default AppFooter;
