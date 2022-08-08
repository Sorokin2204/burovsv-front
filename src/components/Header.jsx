import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authEmployee } from '../redux/actions/employee/auth.action';
const Header = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    localStorage.removeItem('token');
    dispatch(authEmployee());
  };

  return (
    <header class="header">
      <div class="container">
        <div class="header__wrap">
          <div class="logo">
            <div>
              <a href="/index.html">
                <img class="logo__img" src=" /img/header/logo.png" alt="" />
              </a>
            </div>
            <div class="logo__inner">
              <div class="logo__title">Ценалом</div>
              <div class=" logo__name">Образовательный</div>
            </div>
          </div>

          <div class="header__box">
            <div class="search">
              <form class="search__form">
                <input class="search__input" id="search" type="search" placeholder="Поиск ..." />
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

          <button class="burger" type="button" onclick="openNav()">
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
  );
};

export default Header;
