import React, { useEffect, useState } from 'react';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminTesting } from '../../redux/actions/testing/getAdminTesting.action';
import moment from 'moment';
import { resetCreateTesting, resetGetAdminTesting } from '../../redux/slices/testing.slice';
import { setActiveModal } from '../../redux/slices/app.slice';
import Loading from '../Loading';
import ModalTesting from '../modals/ModalTesting';
const AdminTestingPage = () => {
  const [testingSuccess, setTestingSuccess] = useState(false);
  const [viewData, setViewData] = useState([]);
  const [paramsData, setParamsData] = useState({ page: 1, search: '' });
  const dispatch = useDispatch();
  const { activeModal } = useSelector((state) => state.app);
  const {
    getAdminTesting: { data: testings, loading, error },
    createTesting: { data: createTestingData, loading: createTestingLoading },
  } = useSelector((state) => state.testing);

  useEffect(() => {
    dispatch(getAdminTesting(paramsData));
  }, [paramsData]);

  useEffect(() => {
    console.log(paramsData?.page);
    if (paramsData?.page == 1) {
      setViewData(testings);
    } else {
      setViewData([...viewData, ...testings]);
    }
  }, [testings]);

  useEffect(() => {
    return () => {
      dispatch(resetGetAdminTesting());
    };
  }, []);
  useEffect(() => {
    if (createTestingData) {
      setTestingSuccess(true);
      //   dispatch(resetCreateTesting());
      setTimeout(() => {
        setTestingSuccess(false);
      }, 2000);
      dispatch(getAdminTesting(paramsData));
    }
  }, [createTestingData]);

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
    { title: 'Заголовок', prop: 'name', order: 2 },

    {
      title: 'Фильтр',
      prop: 'category',
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        header={header}
        data={viewData}
        onMore={() => setParamsData({ page: paramsData?.page + 1, search: paramsData?.search })}
        onAdd={() => dispatch(setActiveModal('modal-testing'))}
        addBtnText="Добавить новость"
        subText={testingSuccess && 'Новость добавлена'}
        onSearch={(term) => setParamsData({ page: 1, search: term })}
      />
      {activeModal === 'modal-testing' && <ModalTesting />}
      {createTestingLoading && <Loading overlay />}
    </div>
  );
};

export default AdminTestingPage;
