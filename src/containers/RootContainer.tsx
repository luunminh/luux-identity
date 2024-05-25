import { LoadingContainer } from '@components';
import { PREFIX_ROUTE } from '@config/paths';
import { uamPaths, uamRoutes } from '@modules/uam/route';
import { FC, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const NotFound = lazy(() => import('@components/NotFound'));

const routes = [...uamRoutes];

type RootContainerProps = {};

const RootContainer: FC<RootContainerProps> = () => {
  return (
    <Suspense fallback={<LoadingContainer />}>
      <Routes>
        {...routes}

        <Route path={`${PREFIX_ROUTE}`} element={<Navigate to={uamPaths.login} />} />
        <Route path={`${PREFIX_ROUTE}/*`} element={<NotFound />} />
        <Route path="*" element={<Navigate to={uamPaths.login} />} />
      </Routes>
    </Suspense>
  );
};

export default RootContainer;
