import React, { useEffect, useState } from 'react';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminNews } from '../../redux/actions/news/getAdminNews.action';
import moment from 'moment';
import { resetCreateNews, resetGetAdminNews } from '../../redux/slices/news.slice';
import ModalNews from '../modals/ModalNews';
import { setActiveModal } from '../../redux/slices/app.slice';
import Loading from '../Loading';
const AdminNewsPage = () => {
  const [newsSuccess, setNewsSuccess] = useState(false);
  const [viewData, setViewData] = useState([]);
  const [paramsData, setParamsData] = useState({ page: 1, search: '' });
  const dispatch = useDispatch();
  const { activeModal } = useSelector((state) => state.app);
  const {
    getAdminNews: { data: news, loading, error },
    createNews: { data: createNewsData, loading: createNewsLoading },
  } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getAdminNews(paramsData));
  }, [paramsData]);

  useEffect(() => {
    console.log(paramsData?.page);
    if (paramsData?.page == 1) {
      setViewData(news);
    } else {
      setViewData([...viewData, ...news]);
    }
  }, [news]);

  useEffect(() => {
    return () => {
      dispatch(resetGetAdminNews());
    };
  }, []);
  useEffect(() => {
    if (createNewsData) {
      setNewsSuccess(true);
      dispatch(resetCreateNews());
      setTimeout(() => {
        setNewsSuccess(false);
      }, 2000);
    }
  }, [createNewsData]);

  const header = [
    {
      title: 'Дата',
      prop: 'dateStart',
      onChange: (val) => {
        return moment(val).format('DD.MM.YYYY');
      },
    },
    {
      title: 'Окончание',
      prop: 'dateEnd',
      onChange: (val) => {
        return moment(val).format('DD.MM.YYYY');
      },
    },
    { title: 'Заголовок', prop: 'title', order: 2 },
    {
      title: 'Тип',
      prop: 'newsFilter',
      onChange: (val) => {
        return val?.name;
      },
    },
    {
      title: 'Фильтр',
      prop: 'newsFilter',
      onChange: (val) => {
        return val?.newsType?.name;
      },
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        header={header}
        data={viewData}
        onMore={() => setParamsData({ page: paramsData?.page + 1, search: paramsData?.search })}
        onAdd={() => dispatch(setActiveModal('modal-news'))}
        addBtnText="Добавить новость"
        subText={newsSuccess && 'Новость добавлена'}
        onSearch={(term) => setParamsData({ page: 1, search: term })}
      />
      {activeModal === 'modal-news' && <ModalNews />}
      {createNewsLoading && <Loading overlay />}
    </div>
  );
};

export default AdminNewsPage;
