import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Menu as MenuAntd, Layout } from 'antd';
import { MENU } from '../../constants/menu';
import styles from './styles.module.scss';

const _Menu: React.FC<RouteComponentProps> = (props) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(true);
  const menuItem = MENU.find((item) => item.to === props.location.pathname);

  return (
    <Layout.Sider
      className={styles.sider}
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}>
      <MenuAntd
        theme="dark"
        mode="inline"
        className={styles.menu}
        selectedKeys={menuItem ? [menuItem.to] : []}>
        {MENU.map((item) => (
          <MenuAntd.Item key={item.to} icon={<item.icon />} className={styles.menuItem}>
            <Link to={item.to}>{item.title}</Link>
          </MenuAntd.Item>
        ))}
      </MenuAntd>
    </Layout.Sider>
  );
};

export const Menu = withRouter(_Menu);
