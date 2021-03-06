import React from 'react';
import { Container, Menu, Segment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import NavMenuItems from './NavMenuItems';
import SocialButtons from './SocialButtons';
import I18nSwitcher from './I18nSwitcher';
import I18nLink from '../components/I18nLink';

function AppHeader({ children }) {
  const { t } = useTranslation();

  return (
    <Segment
      vertical
      style={{
        position: 'fixed',
        zIndex: 999,
        width: '100%',
        padding: 0,
        background: 'rgba(255,255,255,.8)',
      }}
    >
      <Container>
        <Menu secondary>
          <Menu.Item
            as={I18nLink}
            to={'/'}
            content={t('pages.home.link-label')}
          />

          <NavMenuItems />

          <Menu.Menu position="right">
            <Menu.Item>
              <I18nSwitcher />
            </Menu.Item>
            <Menu.Item>
              <SocialButtons />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    </Segment>
  );
}

export default AppHeader;
