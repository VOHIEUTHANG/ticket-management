import React from 'react';
import '@assets/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '@styles/styles.scss';

import { Routes, Route } from 'react-router-dom';
import { publicRoute, privateRoute } from '@routers/index';
import DefaultLayout from '@layout/DefaultLayout';
import GlobalStyle from '@components/GlobalStyles';
import PrivateRoute from '@components/PrivateRoute';
import type { IRoute } from '@routers/index';

function App() {
  const renderRouteHandler = (isPrivateRoutes: boolean) => {
    return (route: IRoute, i: number) => {
      const Layout = route.layout ?? DefaultLayout;
      const Page = route.element;
      return (
        <Route
          key={i}
          path={route.path}
          element={
            isPrivateRoutes ? (
              <PrivateRoute>
                <Layout activeTab={route.activeTab}>
                  <Page />
                </Layout>
              </PrivateRoute>
            ) : (
              <Layout activeTab={route.activeTab}>
                <Page />
              </Layout>
            )
          }
        />
      );
    };
  };

  return (
    <GlobalStyle>
      <div className="App">
        <Routes>
          {publicRoute.map(renderRouteHandler(false))}
          {privateRoute.map(renderRouteHandler(true))}
        </Routes>
      </div>
    </GlobalStyle>
  );
}

export default App;
