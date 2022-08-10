import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
const StudyCard = ({ title, descShort, dateStart, image, id, newsFilter }) => {
  return (
    <>
      <Link class="training__item video" to={`/news/${id}`}>
        <div class="training__header">
          <div class="training__hash">{newsFilter?.name}</div>
          <img src="/img/training/vebinar.png" alt="" />
        </div>
        <div class="training__tittle">{title}</div>
        <div class="training__data">{dateStart}</div>
        <div class="trainig__text">{descShort}</div>
      </Link>
    </>
  );
};

export default StudyCard;
