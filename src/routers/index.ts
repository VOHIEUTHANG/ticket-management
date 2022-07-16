import TicketCheck from '../view/pages/TicketCheck';
import TicketManagement from '../view/pages/TicketManagement';

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
    path: routes[0],
    element: TicketManagement,
    activeTab: 0,
  },
  {
    path: routes[1],
    element: TicketManagement,
    activeTab: 1,
  },
  {
    path: routes[2],
    element: TicketCheck,
    activeTab: 2,
  },
];

const privateRoute: any[] = [];

export { publicRoute, privateRoute };
