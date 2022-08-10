import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import NewsCard from '../NewsCard';
import Filter from '../Filter';
import { getCatsByPostAndSubdiv } from '../../redux/actions/category/getCatsByPostAndSubdiv';
import { getUserTesting } from '../../redux/actions/testing/getUserTesting.action';
import TestingCard from '../TestingCard';
const TestingPage = () => {
  const dispatch = useDispatch();
  const [viewFilters, setViewFilters] = useState();
  const [activeFilter, setActiveFilter] = useState();
  const {
    getEmployeeUser: { data: user },
  } = useSelector((state) => state.employee);
  const {
    getCatsByPostAndSubdiv: { data: categories, loading: categoriesLoading },
  } = useSelector((state) => state.category);
  const {
    getUserTesting: { data: testingList },
  } = useSelector((state) => state.testing);
  useEffect(() => {
    dispatch(getCatsByPostAndSubdiv({ subdivisionId: user?.postSubdivision?.subdivisionId, postId: user?.postSubdivision?.postId }));
  }, []);
  useEffect(() => {
    if (categories) {
      const filterView = categories?.categories?.filter((cat) => cat?.categoryPostSubdivision?.active === '1')?.map((filt) => ({ label: filt?.name, value: filt?.categoryPostSubdivision?.id }));
      console.log(filterView);
      if (filterView?.length !== 0) setViewFilters([{ label: 'ВСЕ', value: '0' }, ...filterView]);
    }
  }, [categories]);

  useEffect(() => {
    if (activeFilter) {
      dispatch(getUserTesting({ id: activeFilter }));
    }
  }, [activeFilter]);
  useEffect(() => {
    if (viewFilters?.length !== 0 && viewFilters) {
      setActiveFilter(viewFilters[0]?.value);
    }
  }, [viewFilters]);
  return (
    <>
      <Filter list={viewFilters} activeFilter={activeFilter} onClick={(val) => setActiveFilter(val)} />
      <div className="news">
        {testingList?.map((testItem) => (
          <TestingCard {...testItem} />
        ))}
      </div>
    </>
  );
};

export default TestingPage;
