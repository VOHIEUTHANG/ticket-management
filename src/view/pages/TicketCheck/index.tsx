import { useState } from 'react';
import SearchBar from '@components/SearchBar';
import type { ColumnsType } from 'antd/lib/table';
import { Button, Table, Form, Radio, Space, DatePicker } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { TTicketCheck, TticketCheckStatus } from '@interface/index';
import { ticketCheckData } from '@data/dummyData';
import ContentContainer from '@components/ContentContainer';
import moment from 'moment';
import './styles.scss';

const dateFormat = 'MM/DD/YYYY';

const columns: ColumnsType<TTicketCheck> = [
  {
    title: 'STT',
    dataIndex: 'numericalOrder',
    key: 'numericalOrder',
  },
  {
    title: 'Số vé',
    dataIndex: 'ticketNumber',
    key: 'ticketNumber',
  },
  {
    title: 'Ngày sử dụng',
    dataIndex: 'dateOfUse',
    key: 'dateOfUse',
  },
  {
    title: 'Tên loại vé',
    dataIndex: 'nameOfTypeTicket',
    key: 'nameOfTypeTicket',
  },
  {
    title: 'Cổng check-in',
    dataIndex: 'checkInGate',
    key: 'checkInGate',
  },
  {
    title: '',
    dataIndex: 'ticketCheckStatus',
    key: 'ticketCheckStatus',
    render: (status: TticketCheckStatus) => {
      return (
        <div className={status === 'Đã đối soát' ? 'checkedTicket' : 'uncheckedTicket'}>
          {status}
        </div>
      );
    },
  },
];

const TicketChange = () => {
  const [value, setValue] = useState(1);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="row h-100">
      <div className="col-8 col left-col">
        <ContentContainer title="Đối soát vé" mainClass="ticketCheckingPage">
          <div className="content__features">
            <SearchBar placeholder="Tìm bằng số vé" width="446px" />
            <div>
              <Button className="hide solid" style={{ marginLeft: 10 }}>
                Xuất file (.csv)
              </Button>
              <Button className="solid" style={{ marginLeft: 10 }}>
                Chốt đối soát
              </Button>
            </div>
          </div>
          <div className="content__data">
            <div className="data-table">
              <Table
                columns={columns}
                pagination={{ position: ['bottomCenter'], pageSize: 9, size: 'small' }}
                dataSource={ticketCheckData}
              />
            </div>
          </div>
        </ContentContainer>
      </div>
      <div className="col-4 col right-col">
        <div className="content">
          <div className="ticket-filter">
            <h4 className="ticket-filter__title text-style-2">Lọc vé</h4>
            <Form
              name="basic"
              colon={false}
              className="filter-form"
              labelCol={{ span: 11 }}
              wrapperCol={{ span: 13 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="Tình trạng đối soát" name="ticketStatus">
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio value={1}>Tất cả</Radio>
                    <Radio value={2}>Chưa đối soát</Radio>
                    <Radio value={3}>Đã đối soát</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Loại vé" name="typeOfTicket">
                Vé cổng
              </Form.Item>
              <Form.Item label="Từ ngày" name="typeOfTicket">
                <DatePicker
                  disabled
                  defaultValue={moment('01/05/2021', dateFormat)}
                  format={dateFormat}
                />
              </Form.Item>
              <Form.Item label="Đến ngày" name="typeOfTicket">
                <DatePicker defaultValue={moment('01/05/2021', dateFormat)} format={dateFormat} />
              </Form.Item>
              <Form.Item className="form-submit">
                <Button htmlType="submit">Lọc</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketChange;
