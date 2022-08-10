import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserNews } from '../redux/actions/news/getUserNews.action';
import { getNewsFiltersUser } from '../redux/actions/newsFilter/getNewsFiltersUser.action';
import Filter from './Filter';
import Loading from './Loading';
import NewsCard from './NewsCard';
import StudyCard from './StudyCard';

const FilterNews = ({ type = 1 }) => {
  const dispatch = useDispatch();
  const [viewFilters, setViewFilters] = useState();
  const [activeFilter, setActiveFilter] = useState();
  const {
    getNewsFiltersUser: { data: filters, loading: filtersLoading },
  } = useSelector((state) => state.newsFilter);
  const {
    getUserNews: { data: newsList, loading: newsLoading },
  } = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(getNewsFiltersUser({ type: type }));
  }, []);
  useEffect(() => {
    if (filters) {
      const filterView = filters?.map((filt) => ({ label: filt?.name, value: filt?.id }));
      setViewFilters([{ label: 'ВСЕ', value: '0' }, ...filterView]);
    }
  }, [filters]);
  useEffect(() => {
    if (viewFilters?.length !== 0 && viewFilters) {
      setActiveFilter(viewFilters[0]?.value);
    }
  }, [viewFilters]);

  useEffect(() => {
    if (activeFilter) {
      dispatch(getUserNews({ newsFilterId: activeFilter, newsTypeId: type }));
    }
  }, [activeFilter]);

  return (
    <div style={{ position: 'relative' }}>
      {!filtersLoading ? <Filter list={viewFilters} activeFilter={activeFilter} onClick={(val) => setActiveFilter(val)} /> : <Loading />}
      {!newsLoading ? <div className={clsx(type == 1 ? 'news' : 'training')}>{newsList?.length !== 0 && newsList && !newsLoading ? newsList?.map((newsItem) => (type == 1 ? <NewsCard {...newsItem} /> : <StudyCard {...newsItem} />)) : <div class="not-found">Новостей нет</div>}</div> : <Loading />}
    </div>
  );
};

export default FilterNews;
