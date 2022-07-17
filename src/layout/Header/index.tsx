import React from 'react';
import './Header.scss';
import { Avatar, Dropdown, Menu, message, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import SearchBar from '@components/SearchBar';
import { logOut } from '@data/firebase';
import { useSelector } from 'react-redux';
import { profileSelector } from 'src/app/selector';

import Headless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';

import 'tippy.js/dist/tippy.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const currentProfile = useSelector(profileSelector);
  const navigate = useNavigate();
  const logoutHandler = () => {
    logOut()
      .then(() => {
        message.success('Sign out sussefully !');
        setTimeout(() => {
          navigate('/sign-in');
        }, 2000);
      })
      .catch(() => {
        message.error('Sign out failured !');
      });
  };

  return (
    <header className="header">
      <div className="header__search">
        <SearchBar width="100%" placeholder="Search" />
      </div>
      <div className="header__account">
        <div className="account-item">
          <Tippy content="Thư">
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 1H19C20.1 1 21 1.9 21 3V15C21 16.1 20.1 17 19 17H3C1.9 17 1 16.1 1 15V3C1 1.9 1.9 1 3 1Z"
                stroke="#1E0D03"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 1L11 8L1 1"
                stroke="#1E0D03"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Tippy>
        </div>
        <div className="account-item">
          <Tippy content="Thông báo">
            <div className="wrapp-icon">
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z"
                  stroke="#1E0D03"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="6"
                height="3"
                viewBox="0 0 6 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.73002 1C4.55421 1.30308 4.30186 1.55465 3.99825 1.72953C3.69463 1.90441 3.3504 1.99646 3.00002 1.99646C2.64964 1.99646 2.30541 1.90441 2.00179 1.72953C1.69818 1.55465 1.44583 1.30308 1.27002 1"
                  stroke="#1E0D03"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Tippy>
        </div>
        <div className="account-item">
          <Headless
            interactive={true}
            render={attrs => (
              <div className="dropdow-wrapper" tabIndex={-1} {...attrs}>
                <div className="dropdow-item">
                  <UserOutlined />{' '}
                  <span style={{ marginLeft: 6, cursor: 'pointer' }}>Thông Tin</span>
                </div>
                <div onClick={logoutHandler} className="dropdow-item logout">
                  <LogoutOutlined />{' '}
                  <span style={{ marginLeft: 6, cursor: 'pointer' }}>Đăng xuất</span>
                </div>
              </div>
            )}
          >
            <Avatar size={48} icon={<img src={currentProfile.user?.photoURL || ''} alt="" />} />
          </Headless>
        </div>
      </div>
    </header>
  );
};

export default Header;
