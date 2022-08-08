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
      const filterView = categories?.categories?.map((filt) => ({ label: filt?.name, value: filt?.categoryPostSubdivision?.id }));
      setViewFilters(filterView);
    }
  }, [categories]);

  useEffect(() => {
    if (activeFilter) {
      dispatch(getUserTesting({ id: activeFilter }));
    }
  }, [activeFilter]);

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
