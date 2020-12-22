import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Menu } from './components/Menu';
import { LayoutContent } from './components/LayoutContent';
import { ROUTES } from './constants/routes';
import { Board } from './pages/Board';
import { Home } from './pages/Home';
import { Issue } from './pages/Issue';
import { Projects } from './pages/Projects';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <Layout className='app'>
      <Menu />
      <LayoutContent>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.PROJECTS.LIST} component={Projects} />
          <Route exact path={ROUTES.PROFILE} component={Profile} />
          <Route exact path={ROUTES.PROJECTS.DETAIL.TEMPLATE} component={Board} />
          <Route exact path={ROUTES.ISSUES.DETAIL.TEMPLATE} component={Issue} />
          <Route exact path={ROUTES.LOG_IN} component={Login} />
          <Route exact path={ROUTES.REGISTRATION} component={Registration} />
          <Route path={ROUTES.NOT_FOUND} component={NotFound} />
        </Switch>
      </LayoutContent>
    </Layout>
  );
};
