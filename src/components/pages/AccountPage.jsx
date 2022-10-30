import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router';
import clsx from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import NumberFormat from 'react-number-format';
const AccountPage = () => {
  const defaultValues = {};
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

  {
    return errorAccount ? (
      <Navigate to={'/'} />
    ) : (
      dataAccount && !loadingAccount && !errorAccount && (
        <>
          <div class="tab">
            <button class="filter__item tablinks active">Баланс</button>
          </div>
          <div class="tabcontent">
            <div class="wrap__day">
              <div class="blocks__item report " style={{ marginBottom: 0 }}>
                <div className="date" style={{ gridGap: '20px', gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <div className="date__wrap">
                    <div className="date__title">От:</div>
                    <Controller
                      control={control}
                      name={'dateStart'}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, name, value } }) => <NumberFormat style={{ marginBottom: 0, width: '100px' }} format="##.##.####" mask="_" name={name} value={value} placeholder={'01.01.2022'} onChange={onChange} autoComplete="off" />}
                    />
                  </div>
                  <div className="date__wrap">
                    <div className="date__title">До:</div>
                    <Controller
                      control={control}
                      name={'dateEnd'}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, name, value } }) => <NumberFormat style={{ marginBottom: 0, width: '100px' }} format="##.##.####" mask="_" name={name} value={value} placeholder={'01.01.2022'} onChange={onChange} autoComplete="off" />}
                    />
                  </div>{' '}
                  <button class="report__btn">Сформировать</button>
                </div>
              </div>
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
                  <div className="table_common-left">Заработано с начала месяца :&nbsp;</div>
                  <div className="table_common-right">{dataAccount?.earned || 0}</div>
                </div>
              </div>
              <div className="table-common">
                <div className="table-common__head">Дата</div>
                <div className="table-common__head">Наименование</div>
                <div className="table-common__head">Цена</div>
                <div className="table-common__head">Бонус</div>
                <div className="table-common__cell">02.06.2022</div>
                <div className="table-common__cell">Холодильник</div>
                <div className="table-common__cell">2000</div>
                <div className="table-common__cell">120</div>
              </div>
            </div>
          </div>
        </>
      )
    );
  }
};

export default AccountPage;
