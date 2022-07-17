import SearchBar from '@components/SearchBar';
import Tag from '@components/Tag';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { TTicket, TusageStatus, TColor } from '@interface/index';
import { ticketData } from '@data/dummyData';
import ContentContainer from '@components/ContentContainer';

import './styles.scss';

const columns: ColumnsType<TTicket> = [
  {
    title: 'STT',
    dataIndex: 'numericalOrder',
    key: 'numericalOrder',
  },
  {
    title: 'Booking code',
    dataIndex: 'bookingCode',
    key: 'bookingCode',
  },
  {
    title: 'Số vé',
    dataIndex: 'ticketNumber',
    key: 'ticketNumber',
  },
  {
    title: 'Tên sự kiện',
    key: 'eventName',
    dataIndex: 'eventName',
  },
  {
    title: 'Tình trạng sử dụng',
    key: 'usageStatus',
    dataIndex: 'usageStatus',
    render: (status: TusageStatus) => {
      const color: TColor =
        status === 'Đã sử dụng' ? '#919DBA' : status === 'Chưa sử dụng' ? '#03AC00' : '#FD5959';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: 'Ngày sử dụng',
    key: 'dateOfuse',
    dataIndex: 'dateOfuse',
  },
  {
    title: 'Ngày xuất vé',
    key: 'ticketReleaseDate',
    dataIndex: 'ticketReleaseDate',
  },
  {
    title: 'Cổng check-in',
    key: 'checkInGate',
    dataIndex: 'checkInGate',
    render: text => {
      return text ? text : '_';
    },
  },
];

const TicketManagement = () => {
  return (
    <ContentContainer title="Danh sách vé" mainClass="ticketManagementPage">
      <div className="content__features">
        <SearchBar placeholder="Tìm bằng số vé" width="446px" />
        <div>
          <Button
            icon={
              <span>
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 1H1L9 10.46V17L13 19V10.46L21 1Z"
                    stroke="#FF993C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            }
          >
            Lọc vé
          </Button>
          <Button style={{ marginLeft: 10 }}>Xuất file (.csv)</Button>
        </div>
      </div>
      <div className="content__data">
        <div className="data-table">
          <Table
            columns={columns}
            onChange={(pagination: any) => {
              console.log('🚀 ~ file: index.tsx ~ line 229 ~ Content ~ pagination', pagination);
            }}
            pagination={{ position: ['bottomCenter'], pageSize: 9, size: 'small' }}
            dataSource={ticketData}
          />
        </div>
      </div>
    </ContentContainer>
  );
};

export default TicketManagement;
