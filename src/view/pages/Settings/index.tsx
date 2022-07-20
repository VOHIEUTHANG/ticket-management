import React, { useMemo, useState, useRef, useEffect } from 'react';
import SearchBar from '@components/SearchBar';
import { Tag, ContentContainer } from '@components/index';
import type { ColumnsType } from 'antd/lib/table';
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  DatePicker,
  TimePicker,
  Checkbox,
  Select,
} from 'antd';
import { TTicketPackage, TDateTime, TapplyStatus, TColor } from '@interface/index';
import { ticketPackageData } from '@data/dummyData';
import './styles.scss';

const { Option } = Select;

const Settings = () => {
  const [isModalAddPackageTicketShow, setIsModalAddPackageTicketShow] = useState(false);
  const [isModalUpdatePackageTicketShow, setIsModalUpdatePackageTicketShow] = useState(false);
  const [packageData, setPackageData] = useState<TTicketPackage>({} as TTicketPackage);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalAddPackageTicketShow(true);
  };
  const columns: ColumnsType<TTicketPackage> = useMemo(() => {
    const updatePackageHandler = (
      e: React.MouseEvent<HTMLElement, MouseEvent>,
      packageID: string,
    ) => {
      const updatingPackkage = ticketPackageData.find(TPackage => TPackage.packageID === packageID);
      updatingPackkage && setPackageData(updatingPackkage);
      setIsModalUpdatePackageTicketShow(true);
    };
    return [
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
        render: (_, originData) => {
          return (
            <Button
              onClick={e => {
                updatePackageHandler(e, originData.packageID);
              }}
              icon={<i className="fa-solid fa-pen-to-square"></i>}
              type="text"
            >
              Cập nhật
            </Button>
          );
        },
      },
    ];
  }, []);

  // Form submit handler
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <ContentContainer title="Danh sách gói vé" mainClass="settingsPage">
      <div className="content__features">
        <SearchBar placeholder="Tìm bằng số vé" width="446px" />
        <div>
          <Button>Xuất file (.csv)</Button>
          <Button className="solid" onClick={showModal} style={{ marginLeft: 24 }}>
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
      <Modal
        title="Thêm gói vé"
        centered
        width="auto"
        visible={isModalAddPackageTicketShow}
        onOk={() => {
          console.log('You clicked ok button ');
        }}
        onCancel={() => {
          setIsModalAddPackageTicketShow(false);
        }}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên gói vé"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên gói vé' }]}
          >
            <Input placeholder="Nhập tên gói vé" />
          </Form.Item>
          <Space size={40}>
            <Form.Item label="Ngày áp dụng" name="applyDate">
              <Space size="middle">
                <DatePicker placeholder="dd/mm/yy" />
                <TimePicker placeholder="hh:mm:ss" />
              </Space>
            </Form.Item>
            <Form.Item label="Ngày hết hạn" name="expirationDate">
              <Space size="middle">
                <DatePicker placeholder="dd/mm/yy" />
                <TimePicker placeholder="hh:mm:ss" />
              </Space>
            </Form.Item>
          </Space>
          <Form.Item label="Giá vé áp dụng" name="price">
            <Space size="middle" direction="vertical">
              <Checkbox>
                <Space direction="horizontal">
                  <span className="no-wrap">Vé lẻ (vnđ/vé) với giá</span>
                  <Input className="input-bg-gray " placeholder="Giá vé" />
                  <span>/ vé</span>
                </Space>
              </Checkbox>
              <Checkbox>
                <Space direction="horizontal">
                  <span className="no-wrap">Combo vé với giá</span>
                  <Input className="input-bg-gray" placeholder="Giá vé" />
                  <span>/</span>
                  <Input className="input-bg-gray min-width" placeholder="Số vé" />
                  <span>vé</span>
                </Space>
              </Checkbox>
            </Space>
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }} label="Tình trạng" name="status">
            <Select
              defaultValue="on"
              style={{ width: 'fit-content' }}
              onChange={(value: string) => {
                console.log(value);
              }}
            >
              <Option value="on">Đang áp dụng</Option>
              <Option value="off">Tắt</Option>
            </Select>
          </Form.Item>
          <div>
            <span style={{ color: 'red' }}>*</span>{' '}
            <span className="text-style-vlight-italic" style={{ opacity: 0.4 }}>
              là thông tin bắt buộc
            </span>
          </div>
        </Form>
      </Modal>
      <Modal
        title="Cập nhật thông tin gói vé"
        centered
        width="auto"
        visible={isModalUpdatePackageTicketShow}
        onOk={form.submit}
        onCancel={() => {
          setIsModalUpdatePackageTicketShow(false);
        }}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="row">
            <div className="col-6">
              <Form.Item
                label="Mã sự kiện"
                name="eventID"
                initialValue={packageData?.packageID}
                rules={[{ required: true, message: 'Vui lòng nhập tên gói vé' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="Tên sự kiện"
                initialValue={packageData?.packageName}
                name="eventName"
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <Space size={40}>
            <Form.Item label="Ngày áp dụng" name="applyDate">
              <Space size="middle">
                <DatePicker placeholder="dd/mm/yy" />
                <TimePicker placeholder="hh:mm:ss" />
              </Space>
            </Form.Item>
            <Form.Item label="Ngày hết hạn" name="expirationDate">
              <Space size="middle">
                <DatePicker placeholder="dd/mm/yy" />
                <TimePicker placeholder="hh:mm:ss" />
              </Space>
            </Form.Item>
          </Space>
          <Form.Item label="Giá vé áp dụng" name="price">
            <Space size="middle" direction="vertical">
              <Checkbox>
                <Space direction="horizontal">
                  <span className="no-wrap">Vé lẻ (vnđ/vé) với giá</span>
                  <Input className="input-bg-gray " placeholder="Giá vé" />
                  <span>/ vé</span>
                </Space>
              </Checkbox>
              <Checkbox>
                <Space direction="horizontal">
                  <span className="no-wrap">Combo vé với giá</span>
                  <Input className="input-bg-gray" placeholder="Giá vé" />
                  <span>/</span>
                  <Input className="input-bg-gray min-width" placeholder="Số vé" />
                  <span>vé</span>
                </Space>
              </Checkbox>
            </Space>
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }} label="Tình trạng" name="status">
            <Select
              defaultValue="on"
              style={{ width: 'fit-content' }}
              onChange={(value: string) => {
                console.log(value);
              }}
            >
              <Option value="on">Đang áp dụng</Option>
              <Option value="off">Tắt</Option>
            </Select>
          </Form.Item>
          <div>
            <span style={{ color: 'red' }}>*</span>{' '}
            <span className="text-style-vlight-italic" style={{ opacity: 0.4 }}>
              là thông tin bắt buộc
            </span>
          </div>
        </Form>
      </Modal>
    </ContentContainer>
  );
};

export default Settings;
