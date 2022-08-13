import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import Loading from './Loading';
const Table = ({ data, loading, title, onEdit, onDelete, onSearch, onAdd, header, onMore, addBtnText, subText, pages, btnRed }) => {
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log('search CALL');
      onSearch(searchTerm);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  return (
    <>
      {/* {data?.length !== 0 || !loading ? ( */}
      <div className="table__wrap">
        <div className="table__header">
          <div style={{ display: 'flex' }}>
            <button className="table__btn" style={{ ...(btnRed && { backgroundColor: '#ff0d0d', color: '#fff' }) }} onClick={onAdd}>
              {addBtnText}
            </button>
            {/* <div className="text-success" style={{ marginTop: '15px', marginLeft: '10px' }}>
              {subText}
            </div> */}
          </div>
          <div class="search__form" style={{ marginRight: '15px' }}>
            <input class="search__input" id="search" type="search" placeholder="Поиск" autoComplete="off" onChange={(e) => setSearchTerm(e.target.value)} />
            <button class="search__btn" type="submit">
              <a href="">
                <img src="/img/header/search.png" alt="" />
              </a>
            </button>
          </div>
        </div>
        {data?.length !== 0 && (
          <div
            className="table"
            style={{
              gridTemplateColumns: `repeat(${header?.length}, minmax(auto, 1fr)) auto auto`,
            }}>
            {header?.map((head) => (
              <div className="table__head">{head?.title}</div>
            ))}
            <div className="table__head"></div>
            <div className="table__head"></div>
            {data?.map((item, i) => (
              <>
                {header?.map((head) => (
                  <div className={clsx('table__col', i % 2 != 0 && 'table__col--even')}>{head?.onChange ? head?.onChange(item?.[head?.prop] || item) : item?.[head?.prop]?.toString()}</div>
                ))}
                <button className={clsx('table__col', 'table__icon', i % 2 != 0 && 'table__col--even')} onClick={() => onEdit(item)}>
                  <img src={'/img/table/edit.svg'} />
                </button>
                <button className={clsx('table__col', 'table__icon', i % 2 != 0 && 'table__col--even')} onClick={() => onDelete(item)}>
                  <img src={'/img/table/delete.svg'} />
                </button>
              </>
            ))}
          </div>
        )}
        {data?.length == 0 && !loading && <div class="not-found">Ничего не найдено</div>}
        {/* <div style={{ position: 'relative' }}>
            {' '}
            <div style={{ transform: 'scale(70%)', height: data?.length == 0 ? '300px' : '60px' }}>
              <></>
            </div>
          </div> */}
        {data?.length !== 0 && pages > data?.length ? (
          <button className="table__more" onClick={() => onMore()}>
            Показать еще...
          </button>
        ) : (
          <></>
        )}
      </div>
      {/* ) : (
        <Loading />
      )} */}
    </>
  );
};

export default Table;
