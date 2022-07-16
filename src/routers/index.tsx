import TicketCheck from '@view/pages/TicketCheck';
import TicketManagement from '@view/pages/TicketManagement';
import SignIn from '@view/pages/SignIn';
import NotFound from '@view/pages/NotFound';

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
    path: routes.home,
    element: () => <div className="content">Home page</div>,
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
    element: () => <div className="content">Settings</div>,
    activeTab: 3,
  },
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

const privateRoute: any[] = [];

export { publicRoute, privateRoute };
