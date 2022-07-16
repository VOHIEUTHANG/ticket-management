import React, { ReactNode } from 'react';
import './layout.scss';

import Header from '@layout/Header';
import Sidebar from '@layout/Sidebar';

const DefautlLayout = ({
  children,
  activeTab = 0,
}: {
  children: ReactNode;
  activeTab?: number;
}) => {
  return (
    <div className="my-container">
      <div className="ticket-management">
        <div className="col sidebar">
          <Sidebar activeTab={activeTab} />
        </div>
        <div className="col main-content">
          <div className="content-container">
            <Header />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefautlLayout;
