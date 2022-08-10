import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import FilterNews from '../FilterNews';
const StudyPage = () => {
  return (
    <>
      <FilterNews type={2} />
    </>
  );
};

export default StudyPage;
