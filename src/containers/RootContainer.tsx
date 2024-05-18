import { LoadingContainer } from '@components';
import { Navigator } from '@core/common';
import { uamPaths, uamRoutes } from '@modules/uam/route';
import { FC, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const NotFound = lazy(() => import('@components/NotFound'));

const routes = [...uamRoutes];

type RootContainerProps = {};

const RootContainer: FC<RootContainerProps> = () => {
  const portal = Navigator.getCurrentPortalUrl();

  return (
    <Suspense fallback={<LoadingContainer />}>
      <Routes>
        {...routes}

        <Route path={`${portal}`} element={<Navigate to={uamPaths.login} />} />
        <Route path={`${portal}/*`} element={<NotFound />} />
        <Route path="*" element={<Navigate to={uamPaths.login} />} />
      </Routes>
    </Suspense>
  );
};

export default RootContainer;
