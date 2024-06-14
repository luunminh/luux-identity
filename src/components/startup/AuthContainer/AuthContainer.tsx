import appConfigs from '@config';
import { Navigator, TokenService, useComponentDidMount } from '@core/common';
import { UserType, useProfile } from '@core/queries';
import { useAuthStore } from '@core/store';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const AuthContainer: FC<Props> = () => {
  const { onSetIsAuthenticated, onSetUserProfile, isAuthenticated } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const { getMyProfile } = useProfile();

  const handleGetProfile = () => {
    getMyProfile()
      .then((res) => {
        if (res.data) {
          const user = res.data;

          onSetUserProfile(user);
          onSetIsAuthenticated(true);

          handleJumpToPortals(user.type);
        } else {
          clearAuth();
        }
      })
      .catch((error) => {
        clearAuth();
      });
  };

  useComponentDidMount(() => {
    if (
      searchParams.has(TokenService.ACCESS_TOKEN) &&
      searchParams.has(TokenService.REFRESH_TOKEN)
    ) {
      const accessToken = searchParams.get(TokenService.ACCESS_TOKEN);
      const refreshToken = searchParams.get(TokenService.REFRESH_TOKEN);

      TokenService.setACToken(accessToken);
      TokenService.setRFToken(refreshToken);

      setSearchParams({});

      handleGetProfile();
    }
  });

  useEffect(() => {
    if (isAuthenticated === null || isAuthenticated) {
      handleGetProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleJumpToPortals = (userType: UserType) => {
    let params;

    if (appConfigs.MODE === 'development') {
      params = {
        accessToken: TokenService.getACToken(),
        refreshToken: TokenService.getRFToken(),
      };

      setTimeout(() => {
        TokenService.clearTokens();
        onSetIsAuthenticated(null);
      });
    }

    switch (userType) {
      case UserType.ADMIN:
        return Navigator.jumpToWebAdmin(params);
      case UserType.USER:
        return Navigator.jumpToWebApp(params);
      default:
        return Navigator.jumpToWebIdentity();
    }
  };

  const clearAuth = () => {
    TokenService.clearTokens();

    onSetUserProfile(null);
    onSetIsAuthenticated(false);
  };

  return null;
};

type Props = {};

export default AuthContainer;
