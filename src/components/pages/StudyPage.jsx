import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import FilterNews from '../FilterNews';
import { resetGetUserNews } from '../../redux/slices/news.slice';
const StudyPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetGetUserNews());
    };
  }, []);
  return (
    <>
      <FilterNews type={2} textNotFound={'Обучений нет'} />
    </>
  );
};

export default StudyPage;
