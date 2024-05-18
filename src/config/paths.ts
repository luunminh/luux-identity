import { uamPaths } from '@modules/uam/route';

export const PATHS = {
  root: '',
  dev: '/dev',
};

export const PREFIX_ROUTE = '/identity';

// project paths

// design paths

export const HIDE_NAV_PATHS: string[] = [...Object.values(uamPaths)];

export const HIDE_SIDEBAR_PATHS: string[] = [...Object.values(uamPaths)];

export const NOT_REQUIRED_AUTH_PATHS: string[] = [...Object.values(uamPaths)];
