import React from 'react';
import SearchBar from '@components/SearchBar';
import { Tag, ContentContainer } from '@components/index';
import type { ColumnsType } from 'antd/lib/table';
import { Button, Table } from 'antd';
import { TTicketPackage, TDateTime, TapplyStatus, TColor } from '@interface/index';
import { ticketPackageData } from '@data/dummyData';
import './styles.scss';

const columns: ColumnsType<TTicketPackage> = [
  {
    title: 'STT',
    dataIndex: 'numericalOrder',
    key: 'numericalOrder',
  },
  {
    title: 'Mã gói',
    dataIndex: 'packageID',
    key: 'packageID',
  },
  {
    title: 'Tên gói vé',
    dataIndex: 'packageName',
    key: 'packageName',
  },
  {
    title: 'Ngày áp dụng',
    dataIndex: 'dateOfUse',
    key: 'dateOfUse',
    render: (dateOfUse: TDateTime) => {
      return (
        <>
          <div>{dateOfUse.date}</div>
          <div>{dateOfUse.time}</div>
        </>
      );
    },
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'expirationDate',
    key: 'expirationDate',
    render: (expirationDate: TDateTime) => {
      return (
        <>
          <div>{expirationDate.date}</div>
          <div>{expirationDate.time}</div>
        </>
      );
    },
  },
  {
    title: 'Giá vé (VNĐ/Vé)',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => {
      const formatedPrice = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
      return <div>{formatedPrice} </div>;
    },
  },
  {
    title: 'Giá Combo (VNĐ/Combo)',
    dataIndex: 'comboPrice',
    key: 'comboPrice',
    render: (comboPrice: number) => {
      let formatedPrice;
      if (comboPrice) {
        formatedPrice = new Intl.NumberFormat('it-IT', {
          style: 'currency',
          currency: 'VND',
        }).format(comboPrice);
      }
      return <div>{formatedPrice} </div>;
    },
  },
  {
    title: 'Tình trạng',
    dataIndex: 'status',
    key: 'status',
    render: (status: TapplyStatus) => {
      const color: TColor = status === 'Đang áp dụng' ? '#03AC00' : '#FD5959';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: '',
    dataIndex: '',
    key: '',
    render: () => {
      return (
        <Button icon={<i className="fa-solid fa-pen-to-square"></i>} type="text">
          Cập nhật
        </Button>
      );
    },
  },
];

const Settings = () => {
  return (
    <ContentContainer title="Danh sách gói vé" mainClass="settingsPage">
      <div className="content__features">
        <SearchBar placeholder="Tìm bằng số vé" width="446px" />
        <div>
          <Button>Xuất file (.csv)</Button>
          <Button className="solid" style={{ marginLeft: 24 }}>
            Thêm gói vé
          </Button>
        </div>
      </div>
      <div className="content__data">
        <div className="data-table">
          <Table
            columns={columns}
            pagination={{ position: ['bottomCenter'], pageSize: 9, size: 'small' }}
            dataSource={ticketPackageData}
          />
        </div>
      </div>
    </ContentContainer>
  );
};

export default Settings;
