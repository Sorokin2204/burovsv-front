import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import FilterNews from '../FilterNews';
import { resetGetUserNews } from '../../redux/slices/news.slice';
import { resetGetNewsFilterUser } from '../../redux/slices/newsFilter.slice';
const StudyPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetGetNewsFilterUser());
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
