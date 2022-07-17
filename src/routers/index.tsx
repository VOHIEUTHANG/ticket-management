import TicketCheck from '@view/pages/TicketCheck';
import TicketManagement from '@view/pages/TicketManagement';
import SignIn from '@view/pages/SignIn';
import NotFound from '@view/pages/NotFound';
import Home from '@view/pages/Home';
import Settings from '@view/pages/Settings';

import NoneLayout from '@layout/NoneLayout';

import { TPath } from '@interface/index';
import { routes } from './routes';

export interface IRoute {
  path: TPath;
  activeTab?: number;
  element: () => JSX.Element;
  layout?: (props: any) => JSX.Element;
}

const publicRoute: IRoute[] = [
  {
    path: routes.signIn,
    element: SignIn,
    layout: NoneLayout,
  },
  {
    path: routes.notFound,
    element: NotFound,
    layout: NoneLayout,
  },
];

const privateRoute: IRoute[] = [
  {
    path: routes.home,
    element: Home,
    activeTab: 0,
  },
  {
    path: routes.management,
    element: TicketManagement,
    activeTab: 1,
  },
  {
    path: routes.checking,
    element: TicketCheck,
    activeTab: 2,
  },
  {
    path: routes.settings,
    element: Settings,
    activeTab: 3,
  },
];

export { publicRoute, privateRoute };
