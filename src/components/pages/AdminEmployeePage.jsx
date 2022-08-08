import React, { useEffect, useState } from 'react';
import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { resetCreateEmployee, resetGetEmployees } from '../../redux/slices/employee.slice';
import { setActiveModal } from '../../redux/slices/app.slice';
import Loading from '../Loading';
import ModalEmployee from '../modals/ModalEmployee';
import { getEmployees } from '../../redux/actions/employee/getEmployees.action';
import { getEmployee } from '../../redux/actions/employee/getEmployee.action';
import { formatPhone } from '../../utils/formatPhone';
const AdminEmployeePage = () => {
  const [employeeSuccess, setEmployeeSuccess] = useState(false);
  const [viewData, setViewData] = useState([]);
  const [paramsData, setParamsData] = useState({ page: 1, search: '' });
  const dispatch = useDispatch();
  const { activeModal } = useSelector((state) => state.app);
  const {
    getEmployees: { data: employees, loading, error },
    updateEmployee: { data: updateEmployeeData, loading: updateEmployeeLoading },
    // createEmployee: { data: createEmployeeData, loading: createEmployeeLoading },
  } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployees(paramsData));
  }, [paramsData]);

  useEffect(() => {
    console.log(paramsData?.page);
    if (paramsData?.page == 1) {
      setViewData(employees);
    } else {
      setViewData([...viewData, ...employees]);
    }
  }, [employees]);

  useEffect(() => {
    return () => {
      //   dispatch(resetGetEmployees());
    };
  }, []);
  useEffect(() => {
    if (updateEmployeeData) {
      setEmployeeSuccess(true);
      //   dispatch(resetCreateEmployee());
      setTimeout(() => {
        setEmployeeSuccess(false);
      }, 2000);
      dispatch(getEmployees(paramsData));
    }
  }, [updateEmployeeData]);

  const header = [
    {
      title: 'ID',
      prop: 'idService',
      onChange: (val) => {
        return val.substring(0, 8).toUpperCase();
      },
    },
    {
      title: 'Сотрудник',
      onChange: (val) => {
        return ` ${val?.firstName} ${val?.lastName}`;
      },
    },
    {
      title: 'Телефон',
      prop: 'tel',
      onChange: (val) => {
        return formatPhone(val);
      },
    },

    {
      title: 'Должность',
      prop: 'post',
    },
  ];

  return (
    <div>
      <Table
        loading={loading}
        header={header}
        data={viewData}
        onMore={() => setParamsData({ page: paramsData?.page + 1, search: paramsData?.search })}
        onAdd={() => dispatch(setActiveModal('modal-employee'))}
        addBtnText="Добавить новость"
        subText={employeeSuccess && 'Новость добавлена'}
        onSearch={(term) => setParamsData({ page: 1, search: term })}
        onEdit={(val) => {
          dispatch(getEmployee({ id: val?.id }));
          dispatch(setActiveModal('modal-employee'));
        }}
      />
      {activeModal === 'modal-employee' && <ModalEmployee />}
      {updateEmployeeLoading && <Loading overlay />}
    </div>
  );
};

export default AdminEmployeePage;
