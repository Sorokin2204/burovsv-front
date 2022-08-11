import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserNews } from '../redux/actions/news/getUserNews.action';
import { getNewsFiltersUser } from '../redux/actions/newsFilter/getNewsFiltersUser.action';
import { resetGetUserNews } from '../redux/slices/news.slice';
import Filter from './Filter';
import Loading from './Loading';
import NewsCard from './NewsCard';
import StudyCard from './StudyCard';

const FilterNews = ({ type = 1, textNotFound }) => {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(false);
  const [viewFilters, setViewFilters] = useState();
  const [activeFilter, setActiveFilter] = useState();
  const [params, setParams] = useState({ page: 1 });
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
      if (filterView?.length !== 0) {
        setViewFilters([{ label: 'ВСЕ', value: '0' }, ...filterView]);
      } else {
        setViewFilters([]);
      }
      setFirstLoad(true);
    }
  }, [filters]);
  useEffect(() => {
    if (viewFilters?.length !== 0 && viewFilters) {
      setActiveFilter(viewFilters[0]?.value);
    }
  }, [viewFilters]);
  useEffect(() => {
    if (params?.newsTypeId && params?.page) {
      dispatch(getUserNews(params));
    }
  }, [params]);

  useEffect(() => {
    if (activeFilter) {
      setParams({ newsFilterId: activeFilter, newsTypeId: type, page: 1 });
    }
  }, [activeFilter]);

  return newsList !== null ? (
    <div>
      <div style={{ height: '47px' }}> {!filtersLoading ? <Filter list={viewFilters} activeFilter={activeFilter} onClick={(val) => setActiveFilter(val)} /> : <></>}</div>
      <div className={clsx(type == 1 ? 'news' : 'training')}>
        {newsList?.length !== 0 && newsList && !newsLoading ? newsList?.map((newsItem) => (type == 1 ? <NewsCard {...newsItem} key={newsItem?.id} /> : <StudyCard {...newsItem} key={newsItem?.id} />)) : newsList?.length === 0 && !newsLoading ? <div class="not-found">{textNotFound}</div> : <></>}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default FilterNews;
