import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserNews } from '../../redux/actions/news/getUserNews.action';
import { getNewsFiltersUser } from '../../redux/actions/newsFilter/getNewsFiltersUser.action';
import Filter from '../Filter';
import NewsCard from '../NewsCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const [viewFilters, setViewFilters] = useState();
  const [activeFilter, setActiveFilter] = useState();
  const {
    getNewsFiltersUser: { data: filters },
  } = useSelector((state) => state.newsFilter);
  const {
    getUserNews: { data: newsList },
  } = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(getNewsFiltersUser());
  }, []);
  useEffect(() => {
    if (filters) {
      const filterView = filters?.map((filt) => ({ label: filt?.name, value: filt?.id }));
      setViewFilters(filterView);
    }
  }, [filters]);

  useEffect(() => {
    if (activeFilter) {
      dispatch(getUserNews({ newsFilterId: activeFilter }));
    }
  }, [activeFilter]);

  return (
    <>
      <Filter list={viewFilters} activeFilter={activeFilter} onClick={(val) => setActiveFilter(val)} />
      <div className="news">
        {newsList?.map((newsItem) => (
          <NewsCard {...newsItem} />
        ))}
      </div>
      {/* <div class="news">

                            <a class="news__item first__ride" href="/news__page.html">
                                <div class="news__img"><img src="/img/news/rasrochka.png" alt=""></div>
                                <div class="news__content">
                                    <div class="news__tittle">Рассрочка 0-0-12</div>
                                    <div class="news__subtittle">При оплате заказа на сайте дарим дополнительные скидки к клубной цене! </div>
                                    <div class="news__footer">
                                        <div class="news__data">20.02.2022</div>
                                        <div class="news__view"><img src="" alt=""></div>
                                    </div>
                                </div>
                            </a>

                            <a class="news__item first__ride" href="/news__page.html">
                                <div class="news__img"><img src="/img/news/rasprodaja.png" alt=""></div>
                                <div class="news__content">
                                    <div class="news__tittle">Распродажа на cenalom.ru!</div>
                                    <div class="news__subtittle">При оплате заказа на сайте дарим дополнительные скидки к клубной цене!</div>
                                    <div class="news__footer">
                                        <div class="news__data">20.02.2022</div>
                                        <div class="news__view"></div>
                                    </div>
                                </div>
                            </a>

                            <a class="news__item stocks" href="/news__page.html">
                                <div class="news__img"><img src="/img/news/bonus.png" alt=""></div>
                                <div class="news__content">
                                    <div class="news__tittle">Правила использования подарочных бонусов</div>
                                    <div class="news__subtittle">При оплате заказа на сайте дарим дополнительные скидки к клубной цене!</div>
                                    <div class="news__footer">
                                        <div class="news__data">20.02.2022</div>
                                        <div class="news__view"><img src="" alt=""></div>
                                    </div>
                                </div>
                            </a>

                            <a class="news__item stocks" href="/news__page.html">
                                <div class="news__img"><img src="/img/news/holod.png" alt=""></div>
                                <div class="news__content">
                                    <div class="news__tittle">Холодильники «Бирюса» от производителя</div>
                                    <div class="news__subtittle">При оплате заказа на сайте дарим дополнительные скидки к клубной цене!</div>
                                    <div class="news__footer">
                                        <div class="news__data">20.02.2022</div>
                                        <div class="news__view"><img src="" alt=""></div>
                                    </div>
                                </div>
                            </a>

                            <a class="news__item first__ride" href="/news__page.html">
                                <div class="news__img"><img src="/img/news/rasrochka.png" alt=""></div>
                                <div class="news__content">
                                    <div class="news__tittle">Беспроцентная рассрочка с картой Халва</div>
                                    <div class="news__subtittle">При оплате заказа на сайте дарим дополнительные скидки к клубной цене!</div>
                                    <div class="news__footer">
                                        <div class="news__data">20.02.2022</div>
                                        <div class="news__view"><img src="" alt=""></div>
                                    </div>
                                </div>
                            </a>

                            <a class="news__item first__ride" href="/news__page.html">
                                <div class="news__img"><img src="/img/news/skidka.png" alt="">
                                </div>
                                <div class="news__content">
                                    <div class="news__tittle">Скидка за оплату онлайн!</div>
                                    <div class="news__subtittle">При оплате заказа на сайте дарим дополнительные скидки к клубной цене!</div>
                                    <div class="news__footer">
                                        <div class="news__data">20.02.2022</div>
                                        <div class="news__view"><img src="" alt=""></div>
                                    </div>
                                </div>
                            </a>

                            <a class="news__item first__ride" href="/news__page.html">
                                <div class="news__img"><img src="/img/news/likvidacia.png" alt=""></div>
                                <div class="news__content">
                                    <div class="news__tittle">Заголовок</div>
                                    <div class="news__subtittle">При оплате заказа на сайте дарим дополнительные скидки к клубной цене!</div>
                                    <div class="news__footer">
                                        <div class="news__data">20.02.2022</div>
                                        <div class="news__view"><img src="" alt=""></div>
                                    </div>
                                </div>
                            </a>

                            <a class="news__item stocks" href="/news__page.html">
                                <div class="news__img"><img src="/img/news/likvidacia.png" alt=""></div>
                                <div class="news__content">
                                    <div class="news__tittle">Ликвидация в «Ценаломе»!</div>
                                    <div class="news__subtittle">При оплате заказа на сайте дарим дополнительные скидки к клубной цене!</div>
                                    <div class="news__footer">
                                        <div class="news__data">20.02.2022</div>
                                        <div class="news__view"><img src="" alt=""></div>
                                    </div>
                                </div>
                            </a>

                        </div> */}
    </>
  );
};

export default HomePage;
