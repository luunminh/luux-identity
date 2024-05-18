import { Navigator } from '@core/common';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

const SignIn = lazy(() => import('./view/SignIn'));
const SignUp = lazy(() => import('./view/SignUp'));
const ForgotPassword = lazy(() => import('./view/ForgotPassword'));
const ResetPassword = lazy(() => import('./view/ResetPassword'));

const PREFIX_ROUTE = Navigator.getCurrentPortalUrl();

export const uamPaths = {
  login: `/${PREFIX_ROUTE}/login`,
  signup: `/${PREFIX_ROUTE}/signup`,
  forgotPassword: `/${PREFIX_ROUTE}/forgot-password`,
  resetPassword: `/${PREFIX_ROUTE}/reset-password`,
};

export const uamRoutes = [
  <Route key={uamPaths.login} path={uamPaths.login} element={<SignIn />} />,
  <Route key={uamPaths.signup} path={uamPaths.signup} element={<SignUp />} />,
  <Route
    key={uamPaths.forgotPassword}
    path={uamPaths.forgotPassword}
    element={<ForgotPassword />}
  />,
  <Route key={uamPaths.resetPassword} path={uamPaths.resetPassword} element={<ResetPassword />} />,
];
