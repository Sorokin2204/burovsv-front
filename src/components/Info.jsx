import React from 'react';
import { useSelector } from 'react-redux';
const Info = () => {
  const {
    getEmployeeUser: { data: employee },
  } = useSelector((state) => state.employee);
  return (
    <div class="info">
      <div class="personal">
        <div class="personal__avatar">
          <a href="">
            <img src="/img/account.jpg" alt="" />
          </a>
        </div>
        <div class="personal__name">{`${employee?.firstName} ${employee?.lastName}`}</div>
        <div class="personal__post">{employee?.post}</div>
        <div class="personal__city">{employee?.subdivision}</div>
        {/* <div class="personal__plan">12340</div>

        <a class="personal__btn" href="/personal__motivation.html">
          Подробнее 
        </a> */}
      </div>
    </div>
  );
};

export default Info;
