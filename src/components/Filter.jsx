import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';

const Filter = ({ list, onClick, activeFilter }) => {
  return (
    <>
      <div class="filter__news" style={{ overflow: 'hidden' }}>
        {list?.map((item) => {
          return (
            <div onClick={() => onClick(item?.value)} class={clsx('filter__item', activeFilter === item?.value && 'active')}>
              {item?.label}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Filter;
