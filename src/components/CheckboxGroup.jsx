import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
const CheckboxGroup = ({ name, list, register }) => {
  return (
    <>
      <div className="modal__checkbox">
        {list?.map((item, i) => (
          <label key={item?.value}>
            <input type="checkbox" value={item?.value} {...register(`${name}[${i}]`)} /> <span>{item?.label}</span>
          </label>
        ))}{' '}
      </div>
    </>
  );
};

export default CheckboxGroup;
