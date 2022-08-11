import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authEmployee } from '../redux/actions/employee/auth.action';
import { useSearchParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { setSearchTerm } from '../redux/slices/search.slice';
import { globalSearch } from '../redux/actions/search/globalSearch.action';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const onLogout = () => {
    localStorage.removeItem('token');
    dispatch(authEmployee());
  };

  useEffect(() => {
    if (searchParams.get('term')) {
      dispatch(globalSearch({ term: searchParams.get('term') }));
    }
  }, [searchParams.get('term')]);

  const [searchText, setSearchText] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log('search CALL');
      if (searchText !== undefined) {
        navigate(`/search?term=${searchText}`);
      }
      // dispatch(setSearchTerm(searchText));
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  return (
    <>
      <header class="header">
        <div class="container">
          <div class="header__wrap">
            <div class="logo">
              <div>
                <Link to="/">
                  <img class="logo__img" src=" /img/header/logo.png" alt="" />
                </Link>
              </div>
              <div class="logo__inner">
                <div class="logo__title">Ценалом</div>
                <div class=" logo__name">Образовательный</div>
              </div>
            </div>
            {pathname.substring(0, 6) !== '/admin' && (
              <div class="header__box">
                <div class="search">
                  <form class="search__form">
                    <input class="search__input" id="search" type="search" placeholder="Поиск ..." onChange={(e) => setSearchText(e.target.value)} />
                    <button class="search__btn" type="submit">
                      <a href="">
                        <img src="/img/header/search.png" alt="" />
                      </a>
                    </button>
                  </form>
                </div>

                <div class="exit">
                  <div class="exit__name">
                    <a onClick={onLogout}>Выход</a>
                  </div>
                  <div class="exit__img">
                    <a href="">
                      <img src="/img/header/exit.png" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            <button class="burger" type="button" onClick={() => setMenuActive(true)}>
              <img class="burger__icon" src="/img/burger/burger03.png" alt="" />
            </button>

            <div class="overlay" id="myNav">
              <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">
                <img src="/img/burger/close.png" alt="" />
              </a>

              <div class="overlay-content">
                <div class="overlay__link">
                  <a class="motivation__ico" href="/personal__motivation.html">
                    <img src="/img/header/logo_white.png" alt="" />
                  </a>
                  <a href="/index.html">Главная</a>
                  <a href="/training.html">Обучение</a>
                  <a href="/testing.html">Тестирование</a>
                  <a href="/alert.html">Оповещение</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class={clsx('overlay', menuActive && 'overlay--active')} id="myNav">
        <a href="javascript:void(0)" class="closebtn" onClick={() => setMenuActive(false)}>
          <img src="/img/burger/close.png" alt="" />
        </a>

        <div class="overlay-content">
          <div class="overlay__link">
            <a class="motivation__ico" href="/personal__motivation.html">
              <img src="/img/header/logo_white.png" alt="" />
            </a>
            <Link to="/" onClick={() => setMenuActive(false)}>
              Главная
            </Link>
            <Link to="/study" onClick={() => setMenuActive(false)}>
              Обучение
            </Link>
            <Link to="/testing" onClick={() => setMenuActive(false)}>
              Тестирование
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
