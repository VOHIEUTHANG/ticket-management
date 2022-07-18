import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { TinyArea } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';
import ContentContainer from '@components/ContentContainer';
import './styles.scss';

const dateFormat = 'MM/DD/YYYY';

const DemoTinyArea = () => {
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539,
    243, 226, 192,
  ];
  const config = {
    height: 200,
    autoFit: false,
    data,
    smooth: true,
    theme: 'default', // 'dark',
  };
  return <TinyArea {...config} />;
};

const DemoPie = () => {
  const data = [
    {
      type: 'Đã sử dụng',
      value: 56024,
    },
    {
      type: 'Chưa sử dụng',
      value: 13568,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'AntV\nG2Plot',
      },
    },
  };
  return <Pie {...config} />;
};

const Home = () => {
  return (
    <ContentContainer mainClass="homePage" title="Thống kê">
      <div className="content__features">
        <div className="text-style-subtitle content__subtitle">Doanh thu</div>
        <DatePicker defaultValue={moment('01/05/2021', dateFormat)} format={dateFormat} />
      </div>
      <div className="content__chart-line">
        <DemoTinyArea />
      </div>
      <div className="content__chart-pie">
        <div className="sub-title">
          <span>Tổng doanh thu</span>
          <br />
          <span>
            525.145.000<sub>đồng</sub>
          </span>
        </div>
        <div className="d-flex">
          <div>
            <DemoPie />
          </div>
          <div>
            <DemoPie />
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default Home;
