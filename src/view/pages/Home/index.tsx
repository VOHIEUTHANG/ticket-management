import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Area } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';
import { demoData } from '@data/dummyData';
import ContentContainer from '@components/ContentContainer';
import './styles.scss';

const dateFormat = 'MM/YYYY';

// const DemoTinyArea = () => {
//   const data = [
//     264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539,
//     243, 226, 192,
//   ];
//   const config = {
//     height: 200,
//     autoFit: false,
//     data,
//     smooth: true,
//     theme: 'default', // 'dark',
//   };
//   return <TinyArea {...config} />;
// };

const data1 = [
  {
    type: 'Chưa sử dụng',
    value: 13568,
  },
  {
    type: 'Đã sử dụng',
    value: 56024,
  },
];
const data2 = [
  {
    type: 'Chưa sử dụng',
    value: 28302,
  },
  {
    type: 'Đã sử dụng',
    value: 30256,
  },
];

const PieChart = ({
  data,
  legend,
}: {
  data: { type: string; value: number }[];
  legend?: false;
}) => {
  const config = {
    appendPadding: 0,
    width: 246,
    height: 246,
    data,
    angleField: 'value',
    colorField: 'type',
    color: ['#FF8A48', '#4F75FF'],
    radius: 1,
    legend: legend,
    innerRadius: 0.5,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        fill: 'white',
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
        content: '',
      },
    },
  };
  return <Pie {...config} />;
};

const AreaChart = () => {
  const config = {
    data: demoData,
    height: 220,
    xField: 'Date',
    yField: 'revenue',
    smooth: true,
    startOnZero: false,
    line: {
      color: '#FF8A48',
      size: 3,
    },
    yAxix: { tickCount: 3, min: 100, minLimit: 100 },
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 1:#FF8A48',
      };
    },
  };
  return <Area {...config} />;
};

const Home = () => {
  return (
    <ContentContainer mainClass="homePage" title="Thống kê">
      <div className="content__features">
        <div className="text-style-subtitle content__subtitle">Doanh thu</div>
        <DatePicker defaultValue={moment('04/2021', dateFormat)} format={dateFormat} />
      </div>
      <div className="content__chart-line">
        {
          /* <DemoTinyArea /> */
          <AreaChart />
        }
      </div>

      <div className="content__chart-pie">
        <div className="chart-pie-title">
          <span className="chart-pie__revenue text-style-light-thi">Tổng doanh thu theo tuẩn</span>
          <br />
          <span className="text-style-2">
            525.145.000<sub className="text-style-light-thin">đồng</sub>
          </span>
        </div>
        <div className="d-flex chart-pie-container">
          <div>
            <DatePicker defaultValue={moment('04/2021', dateFormat)} format={dateFormat} />
          </div>
          <div className="chart-pie-item">
            <p className="text-style-subtitle" style={{ marginBottom: 25 }}>
              Gói gia đình
            </p>
            <PieChart data={data1} legend={false} />
          </div>
          <div className="chart-pie-item">
            <p className="text-style-subtitle" style={{ marginBottom: 25 }}>
              Gói sự kiện
            </p>
            <PieChart data={data2} legend={false} />
          </div>
          <div>
            <div>
              <div className="chart__type d-flex">
                <div className="chart__color used"></div>
                <div className="chart__text">Vé đã sử dụng</div>
              </div>
              <div className="chart__type d-flex">
                <div className="chart__color unused"></div>
                <div className="chart__text">Vé chưa sử dụng</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default Home;
