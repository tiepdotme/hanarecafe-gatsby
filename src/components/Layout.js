import React, { Suspense } from 'react';
import { Button, Menu, Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import Media from 'react-media';
import { useTranslation } from 'react-i18next';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import NavMenuItems from './NavMenuItems';
import NavLink from './NavLink';
import SocialButtons from './SocialButtons';
import useSiteMetadata from './useSiteMetadata';
import I18nSwitcher from './I18nSwitcher';

import '../i18n';

function BaseHead() {
  const { title, description } = useSiteMetadata();
  return (
    /* prettier-ignore */
    <Helmet>
      <html />
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="apple-touch-icon" sizes="57x57" href={`${withPrefix('/')}img/apple-icon-57x57.png`} />
      <link rel="apple-touch-icon" sizes="60x60" href={`${withPrefix('/')}img/apple-icon-60x60.png`} />
      <link rel="apple-touch-icon" sizes="72x72" href={`${withPrefix('/')}img/apple-icon-72x72.png`} />
      <link rel="apple-touch-icon" sizes="76x76" href={`${withPrefix('/')}img/apple-icon-76x76.png`} />
      <link rel="apple-touch-icon" sizes="114x114" href={`${withPrefix('/')}img/apple-icon-114x114.png`} />
      <link rel="apple-touch-icon" sizes="120x120" href={`${withPrefix('/')}img/apple-icon-120x120.png`} />
      <link rel="apple-touch-icon" sizes="144x144" href={`${withPrefix('/')}img/apple-icon-144x144.png`} />
      <link rel="apple-touch-icon" sizes="152x152" href={`${withPrefix('/')}img/apple-icon-152x152.png`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`${withPrefix('/')}img/apple-icon-180x180.png`} />
      <link rel="icon" type="image/png" sizes="192x192"  href={`${withPrefix('/')}img/android-icon-192x192.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${withPrefix('/')}img/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="96x96" href={`${withPrefix('/')}img/favicon-96x96.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${withPrefix('/')}img/favicon-16x16.png`} />
      <link rel="manifest" href={`${withPrefix('/')}img/manifest.json`} />
      <meta name="theme-color" content="#00000" />
      <meta property="og:type" content="business.business" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="/" />
      <meta  property="og:image" content={`${withPrefix('/')}img/honden-0006.jpg`} />
    </Helmet>
  );
}

function MobileTemplate({ children }) {
  const { phoneValue } = useSiteMetadata();
  const { t } = useTranslation();
  return (
    <>
      <label className="FullscreenMenu">
        <input type="checkbox" />

        <span className="hamburgerButton">
          <span className="hamburgerIcon"></span>
        </span>

        <nav className="menuItems">
          <Menu secondary vertical>
            <Menu.Item
              as={NavLink}
              to={'/'}
              content={t(`nav-menu-items.home`)}
            />

            <NavMenuItems />

            <I18nSwitcher />

            <Menu.Item>
              <SocialButtons />
            </Menu.Item>

            <Menu.Item>
              <Header as="h4">{t('headings.contact-us')}</Header>
              <Button
                as="a"
                href={`tel:${phoneValue}`}
                icon="phone"
                circular
                size="large"
                color="green"
                basic
              />
            </Menu.Item>
          </Menu>
        </nav>
      </label>

      {children}
    </>
  );
}

function DesktopTemplate({ children }) {
  return (
    <div style={{ minHeight: '80vh' }}>
      <AppHeader />

      <div className="spacer" style={{ height: '44px' }}></div>

      {children}
    </div>
  );
}

function Layout({ children }) {
  return (
    <Suspense fallback="loading">
      <BaseHead />

      <Media query={{ maxWidth: 991 }}>
        {(matches) =>
          matches ? (
            <MobileTemplate>{children}</MobileTemplate>
          ) : (
            <DesktopTemplate>{children}</DesktopTemplate>
          )
        }
      </Media>

      <AppFooter />
    </Suspense>
  );
}

export default Layout;
