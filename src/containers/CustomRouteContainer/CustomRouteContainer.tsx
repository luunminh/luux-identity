import { SplashScreen } from '@components';
import { ToastService } from '@core/common';
import { useAuthStore } from '@core/store';
import { uamPaths } from '@modules/uam/route';
import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

type CustomRouteProps = {
  pageRequiredAuth?: boolean;
};

/**
 * @params pageRequiredAuth?: boolean
 * @children ReactNode
 */
const CustomRoute: FC<PropsWithChildren<CustomRouteProps>> = ({
  pageRequiredAuth = true,
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated === null) return <SplashScreen />;

  if ((isAuthenticated && pageRequiredAuth) || (!isAuthenticated && !pageRequiredAuth)) {
    return <>{children}</>;
  }

  const redirectPath = uamPaths.login;

  ToastService.error('You are not authorized to access this page');

  return <Navigate to={redirectPath} />;
};

export default CustomRoute;
