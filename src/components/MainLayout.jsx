import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { getEmployee } from '../redux/actions/employee/getEmployee.action';
import { getEmployeeUser } from '../redux/actions/employee/getEmployeeUser.action';
import Header from './Header';
import Info from './Info';
import Menu from './Menu';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(getEmployeeUser());
  }, []);

  return (
    <div class="page">
      <Header />
      <div class="section">
        <div class="container">
          <div class="content__inner">
            <Menu />
            <div className={clsx('content', pathname.substring(0, 6) === '/admin' && 'content-admin')}>{children}</div>

            {pathname.substring(0, 6) !== '/admin' && <Info />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
