import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
const NewsCard = ({ title, descShort, dateStart, image, id }) => {
  return (
    <Link class="news__item first__ride" to={`/news/${id}`}>
      <div class="news__img">
        <img src={`http://localhost:8080/${image}`} alt="" />
      </div>
      <div class="news__content">
        <div class="news__tittle">{title}</div>
        <div class="news__subtittle">{descShort} </div>
        <div class="news__footer">
          <div class="news__data">{dateStart}</div>
          <div class="news__view">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
