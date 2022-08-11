import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import NewsCard from '../NewsCard';
import Filter from '../Filter';
import { getCatsByPostAndSubdiv } from '../../redux/actions/category/getCatsByPostAndSubdiv';
import { getUserTesting } from '../../redux/actions/testing/getUserTesting.action';
import TestingCard from '../TestingCard';
import Loading from '../Loading';
import { resetGetUserTesting } from '../../redux/slices/testing.slice';
const TestingPage = () => {
  const dispatch = useDispatch();
  const [viewFilters, setViewFilters] = useState();
  const [activeFilter, setActiveFilter] = useState();
  const [viewData, setViewData] = useState([]);
  const [params, setParams] = useState({ page: 1 });
  const {
    getEmployeeUser: { data: user },
  } = useSelector((state) => state.employee);
  const {
    getCatsByPostAndSubdiv: { data: categories, loading: categoriesLoading },
  } = useSelector((state) => state.category);
  const {
    getUserTesting: { data: testingList, loading: testingLoading, count },
  } = useSelector((state) => state.testing);
  useEffect(() => {
    if (user) {
      dispatch(getCatsByPostAndSubdiv({ subdivisionId: user?.postSubdivision?.subdivisionId, postId: user?.postSubdivision?.postId }));
    }
  }, [user]);
  useEffect(() => {
    if (categories?.length !== 0) {
      const filterView = categories?.categories?.filter((cat) => cat?.categoryPostSubdivision?.active === '1')?.map((filt) => ({ label: filt?.name, value: filt?.categoryPostSubdivision?.id }));
      console.log(filterView);
      if (filterView?.length !== 0) setViewFilters([{ label: 'ВСЕ', value: '0' }, ...filterView]);
    }
  }, [categories]);

  useEffect(() => {
    if (activeFilter) {
      setParams({ page: 1, id: activeFilter });
    }
  }, [activeFilter]);

  useEffect(() => {
    if (params?.id !== undefined && params?.page) {
      dispatch(getUserTesting(params));
    }
  }, [params]);

  useEffect(() => {
    if (viewFilters?.length !== 0 && viewFilters) {
      setActiveFilter(viewFilters[0]?.value);
    }
  }, [viewFilters]);
  useEffect(() => {
    return () => {
      dispatch(resetGetUserTesting());
    };
  }, []);

  useEffect(() => {
    console.log(params?.page);
    if (params?.page == 1) {
      setViewData(testingList);
    } else {
      setViewData([...viewData, ...testingList]);
    }
  }, [testingList]);
  return (
    testingList !== null && (
      <>
        {!categoriesLoading ? <Filter list={viewFilters} activeFilter={activeFilter} onClick={(val) => setActiveFilter(val)} /> : <></>}
        {viewData?.length !== 0 ? (
          <div className="news">{viewData?.length !== 0 ? viewData?.map((testItem) => <TestingCard {...testItem} key={testItem?.id} />) : <div class="not-found">Тестов нет</div>}</div>
        ) : viewData?.length == 0 && !testingLoading ? (
          <div class="not-found">Тестов нет</div>
        ) : (
          <></>
        )}

        {viewData?.length !== 0 && count > viewData?.length ? (
          <button className="table__more" onClick={() => setParams({ ...params, page: params.page + 1 })}>
            Показать еще...
          </button>
        ) : (
          <></>
        )}
      </>
    )
  );
};

export default TestingPage;
