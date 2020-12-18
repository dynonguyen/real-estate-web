import constants from 'constants/index.js';
import React from 'react';
import { Route } from 'react-router-dom';

const routes = [
  {
    path: constants.ROUTES.HOME,
    exact: true,
    main: () => <h1>Hello</h1>,
  },
  {
    path: constants.ROUTES.NOT_FOUND,
    exact: true,
    main: () => <h1>Not Found</h1>,
  },
];

// render routes
const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    const { path, exact, main } = route;
    return <Route key={index} path={path} exact={exact} component={main} />;
  });
};

export default {
  routes,
  renderRoutes,
};
