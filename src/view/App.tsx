import React from 'react';
import '@assets/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '@styles/styles.scss';

import { Routes, Route } from 'react-router-dom';
import { publicRoute } from '@routers/index';
import DefaultLayout from '@layout/DefaultLayout';
import GlobalStyle from '@components/GlobalStyles';
function App() {
  return (
    <GlobalStyle>
      <div className="App">
        <Routes>
          {publicRoute.map((route, i) => {
            const Layout = route.layout ?? DefaultLayout;
            const Page = route.element;
            return (
              <Route
                key={i}
                path={route.path}
                element={
                  <Layout activeTab={route.activeTab}>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </GlobalStyle>
  );
}

export default App;
