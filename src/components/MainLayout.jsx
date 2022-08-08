import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEmployee } from '../redux/actions/employee/getEmployee.action';
import { getEmployeeUser } from '../redux/actions/employee/getEmployeeUser.action';
import Header from './Header';
import Info from './Info';
import Menu from './Menu';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
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
            <div className="content">{children}</div>

            <Info />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
