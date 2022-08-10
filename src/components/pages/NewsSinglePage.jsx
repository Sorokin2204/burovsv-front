import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router';
import clsx from 'clsx';
import { Interweave } from 'interweave';
import { getUserNewsSingle } from '../../redux/actions/news/getUserNewsSingle.action';
import FilterNews from '../FilterNews';
const NewsSinglePage = () => {
  const { newsId } = useParams();
  const dispatch = useDispatch();
  const {
    getUserNewsSingle: { data: newsData },
  } = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(getUserNewsSingle({ newsId }));
  }, [newsId]);

  return (
    <div class="news__page">
      <div class="container">
        <div class="news__page__wrap">
          <div class="news__page__item">
            <div class="news__page__tittle">{newsData?.title}</div>
            <Interweave content={newsData?.desc} />
          </div>
        </div>
      </div>
      <FilterNews />
    </div>
  );
};

export default NewsSinglePage;
