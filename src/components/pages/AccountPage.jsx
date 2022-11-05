import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router';
import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import moment from 'moment/moment';
import { getAccount } from '../../redux/actions/employee/getAccount.action';
import CalendarFilter from '../CalendarFilter';
const AccountPage = () => {
  const defaultValues = { date: new Date() };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm({ defaultValues });
  const {
    getAccount: { data: dataAccount, loading: loadingAccount, error: errorAccount },
  } = useSelector((state) => state.employee);
  const dateWatch = watch('date');
  const onBlurDate = () => {
    const isValidDate = moment(getValues('date')).isValid();
    if (!isValidDate) {
      setValue('date', moment().format('DD.MM.YYYY'));
    }
  };
  const dispatch = useDispatch();
  const {
    getEmployeeUser: { data: employee },
  } = useSelector((state) => state.employee);
  const onSubmit = (data) => {
    dispatch(getAccount({ idService: employee?.idService, date: moment(data?.date).format('YYYY-DD-MM') }));
  };

  // return errorAccount ? (
  //   <Navigate to={'/'} />
  // ) : (
  //  (
  //   dataAccount && (
  const [showDateFilter, setShowDateFilter] = useState(false);
  return (
    <>
      <div class="tab">
        <button class="filter__item tablinks active">Баланс</button>
      </div>
      <div class="tabcontent">
        <div class="wrap__day">
          <div className="table__common">
            <div className="table__common-item">
              <div className="table_common-left">Баланс:&nbsp;</div>
              <div className="table_common-right">{dataAccount?.balance || 0}</div>
            </div>
            <div className="table__common-item">
              <div className="table_common-left">Часы :&nbsp;</div>
              <div className="table_common-right">{dataAccount?.hours || 0}</div>
            </div>
            <div className="table__common-item">
              <div className="table_common-left">С начала месяца :&nbsp;</div>
              <div className="table_common-right">{dataAccount?.earned || 0}</div>
            </div>
          </div>
          <div class="blocks__item report " style={{ marginBottom: 0 }}>
            <div className="date" style={{ gridGap: '0px', gridTemplateColumns: 'auto auto' }}>
              <div className="date__wrap" style={{ marginRight: '20px', position: 'relative' }}>
                {/* <Controller
                  control={control}
                  name={'date'}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, name, value } }) => (
                    <NumberFormat
                      style={{ marginBottom: 0, width: '100px' }}
                      format="##.##.####"
                      mask="_"
                      name={name}
                      value={moment(value).format('DD.MM.YYYY')}
                      placeholder={'01.01.2022'}
                      onValueChange={() => {}}
                      onClick={() => {
                        setShowDateFilter(!showDateFilter);
                      }}
                      onChange={() => {}}
                      autoComplete="off"
                    />
                  )}
                /> */}
                <input
                  type="text"
                  style={{ marginBottom: 0, width: '100px', userSelect: 'none', caretColor: 'transparent', cursor: 'pointer' }}
                  value={moment(dateWatch).format('DD.MM.YYYY')}
                  onClick={() => {
                    if (showDateFilter) {
                      setShowDateFilter(false);
                    } else {
                      setShowDateFilter(true);
                    }
                  }}
                />
                {/* <NumberFormat
                  style={{ marginBottom: 0, width: '100px', userSelect: 'none' }}
                  format="##.##.####"
                  mask="_"
                  // name={name}
                  value={moment(dateWatch).format('DD.MM.YYYY')}
                  placeholder={'01.01.2022'}
                  onValueChange={() => {
                    setValue(moment(dateWatch).format('DD.MM.YYYY'));
                  }}
                 
                  onChange={() => {
                    setValue(moment(dateWatch).format('DD.MM.YYYY'));
                  }}
                  autoComplete="off"
                /> */}
                {showDateFilter && (
                  <CalendarFilter
                    setDate={(dateNews) => {
                      setValue('date', dateNews);
                    }}
                    date={dateWatch}
                    onClose={() => setShowDateFilter(false)}
                  />
                )}
              </div>{' '}
              {loadingAccount ? (
                <div className="loading-account">Идет загрузка...</div>
              ) : (
                <button class="report__btn" onClick={handleSubmit(onSubmit)}>
                  Сформировать отчет о личном
                </button>
              )}
            </div>
          </div>
          {dataAccount?.table && dataAccount?.table?.length > 0 && !loadingAccount ? (
            <div className="table-common">
              <div className="table-common__head">Дата</div>
              <div className="table-common__head">Наименование</div>
              <div className="table-common__head">Кол-во</div>
              <div className="table-common__head">Бонус</div>
              {dataAccount?.table?.map((row) => (
                <>
                  <div className="table-common__cell">{moment(row?.date_sale).format('DD.MM.YYYY')}</div>
                  <div className="table-common__cell">{row?.product}</div>
                  <div className="table-common__cell">{row?.quantity}</div>
                  <div className="table-common__cell">{(parseFloat(row?.ranc) + parseFloat(row?.turn) + parseFloat(row?.margin)).toFixed(2)}</div>
                </>
              ))}
            </div>
          ) : (!dataAccount?.table || dataAccount?.table?.length === 0) && !loadingAccount ? (
            <div style={{ margin: '40px auto 0 auto', textAlign: 'center', color: '#ff0d0d', display: 'flex', justifyContent: 'left', marginBottom: '60px' }}>На выбраную дату продаж нет. Попробуйте выбрать рабочий день, где были продажи</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
  //   )
  // );
  // );
};

export default AccountPage;
