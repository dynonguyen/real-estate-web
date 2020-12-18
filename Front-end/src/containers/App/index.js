//commons css
import 'antd/dist/antd.css';
import 'commons/utils/index.scss';
import GlobalLoading from 'components/GlobalLoading';
//configuration
import 'configs/message.config';
import routesConfig from 'configs/routesConfig';
//React
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const { renderRoutes, routes } = routesConfig;

  //rendering...
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoading />}>
        <div className="App" id="app">
          <Switch>
            {renderRoutes(routes)}
            <Route>
              <h1>Not found</h1>
            </Route>
          </Switch>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
