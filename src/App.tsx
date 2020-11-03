import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Menu } from './components/Menu';
import { ROUTES } from './constants/routes';
import { Board } from './pages/Board';
import { Home } from './pages/Home';

export const App: React.FC = () => {
  return (
    <Layout className="app">
      <Menu />
      <Layout>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.BOARD} component={Board} />
      </Layout>
    </Layout>
  );
};
