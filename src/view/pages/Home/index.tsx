import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import ContentContainer from '@components/ContentContainer';
import './styles.scss';

const dateFormat = 'MM/DD/YYYY';

const Home = () => {
  return (
    <ContentContainer mainClass="homePage" title="Thống kê">
      <div className="content__features">
        <div className="text-style-subtitle content__subtitle">Doanh thu</div>
        <DatePicker defaultValue={moment('01/05/2021', dateFormat)} format={dateFormat} />
      </div>
    </ContentContainer>
  );
};

export default Home;
