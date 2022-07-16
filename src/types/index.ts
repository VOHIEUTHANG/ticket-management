type TusageStatus = 'Đã sử dụng' | 'Chưa sử dụng' | 'Hết hạn';
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type TColor = RGB | RGBA | HEX;

type path = 'management' | 'check' | 'settings';
type TPath = `/ticket-${path}` | '/' | '/sign-in' | '*' | '/sign-up';

interface TTicket {
  key: string;
  numericalOrder: number;
  bookingCode: string;
  ticketNumber: string;
  eventName: string;
  usageStatus: TusageStatus;
  dateOfUse: string;
  ticketReleaseDate: string;
  checkInGate: string;
}

type TticketCheckStatus = 'Chưa đối soát' | 'Đã đối soát';

interface TTicketCheck {
  key: string;
  numericalOrder: number;
  ticketNumber: string;
  dateOfUse: string;
  nameOfTypeTicket: string;
  checkInGate: string;
  ticketCheckStatus: TticketCheckStatus;
}

export type { TColor, TTicket, TusageStatus, TticketCheckStatus, TTicketCheck, TPath };
