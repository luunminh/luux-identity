import { CustomErrorBoundary } from '@components';
import { AuthContainer } from '@components/startup';
import { LoadingGlobalContainer } from '@containers';
import { AppShell } from '@mantine/core';
import { PropsWithChildren } from 'react';

type MainLayoutProps = PropsWithChildren;

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <CustomErrorBoundary showErrorMessage>
      <AppShell>
        <AppShell.Navbar />

        <AppShell.Main>
          {children}

          <AuthContainer />
          <LoadingGlobalContainer />
        </AppShell.Main>
      </AppShell>
    </CustomErrorBoundary>
  );
};

export default MainLayout;
