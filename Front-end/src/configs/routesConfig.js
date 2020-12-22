import constants from 'constants/index.js';
import HomePage from 'containers/HomePage';
import React from 'react';
import { Route } from 'react-router-dom';
const Login = React.lazy(() => import('containers/Login'));
const Signup = React.lazy(() => import('containers/SignUp'));
const ForgotPassword = React.lazy(() =>
  import('containers/Login/ForgotPassword'),
);
const NotFound = React.lazy(() => import('components/NotFound'));
const PostDetailPage = React.lazy(() => import('containers/PostDetailPage'));
const FilterPage = React.lazy(() => import('containers/FilterPage'));
const ContactPost = React.lazy(() => import('components/ContactPost'));
const AdminPage = React.lazy(() => import('containers/AdminPage'));

const routes = [
  {
    path: constants.ROUTES.HOME,
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: constants.ROUTES.FORGOT_PASSWORD,
    exact: true,
    main: () => <ForgotPassword />,
  },
  {
    path: constants.ROUTES.LOGIN,
    exact: true,
    main: () => <Login />,
  },
  {
    path: constants.ROUTES.SIGNUP,
    exact: true,
    main: () => <Signup />,
  },
  {
    path: constants.ROUTES.NOT_FOUND,
    exact: true,
    main: () => <NotFound />,
  },
  {
    path: constants.ROUTES.HOUSE + '/:id',
    exact: true,
    main: (id) => <PostDetailPage id={id} />,
  },
  {
    path: constants.ROUTES.FILTER,
    exact: true,
    main: () => <FilterPage />,
  },
  {
    path: constants.ROUTES.CONTACT_POST,
    exact: true,
    main: () => <ContactPost />,
  },
  {
    path: constants.ROUTES.ADMIN,
    exact: true,
    main: () => <AdminPage />,
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
