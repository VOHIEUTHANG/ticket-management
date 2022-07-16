import TicketCheck from '../view/pages/TicketCheck';
import TicketManagement from '../view/pages/TicketManagement';

export interface IRoute {
  path: string;
  activeTab?: number;
  element: () => JSX.Element;
  layout?: (props: any) => JSX.Element;
}

const publicRoute: IRoute[] = [
  {
    path: '/ticket-check',
    element: TicketCheck,
    activeTab: 2,
  },
  {
    path: '/ticket-management',
    element: TicketManagement,
    activeTab: 1,
  },
];

const privateRoute: any[] = [];

export { publicRoute, privateRoute };
