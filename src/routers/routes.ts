import type { TPath } from '@interface/index';
type pathItem = {
  [key: string]: TPath;
};
export const routes: pathItem = {
  home: '/',
  management: '/ticket-management',
  checking: '/ticket-check',
  settings: '/ticket-settings',
  signIn: '/sign-in',
  signUp: '/sign-up',
  notFound: '*',
};
