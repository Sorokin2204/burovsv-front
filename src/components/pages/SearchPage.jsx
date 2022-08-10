import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useQuery } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import SearchCard from '../SearchCard';
import Loading from '../Loading';
const SearchPage = () => {
  const {
    globalSearch: { data: searchResult, loading: searchLoading },
  } = useSelector((state) => state.search);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('term'));

  return (
    <>
      {
        <div class="alert">
          <div class="container">
            <div class="alert__wrap">
              <div className="alert__title">{`Результать по "${searchParams.get('term')}"`}</div>
              {!searchLoading ? (
                searchResult?.count !== 0 ? (
                  <>
                    <>
                      {searchResult?.news?.map((newsItem) => (
                        <SearchCard link={`/news/${newsItem?.id}`} title={newsItem?.title} desc={newsItem?.descShort} />
                      ))}
                    </>
                    <>
                      {searchResult?.study?.map((newsItem) => (
                        <SearchCard link={`/news/${newsItem?.id}`} title={newsItem?.title} desc={newsItem?.descShort} />
                      ))}
                    </>{' '}
                    <>
                      {searchResult?.testing?.map((testItem) => (
                        <SearchCard linkBlank link={testItem?.linkTest} title={testItem?.name} desc={testItem?.desc} />
                      ))}
                    </>
                  </>
                ) : (
                  <div class="not-found">Ничего не найдено</div>
                )
              ) : (
                <Loading />
              )}
              {/* <a class="alert__item" href="/testing.html">
                <div class="alert__title">Тестирование</div>
                <div class="alert__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptatem ea, sed laudantium dolor corrupti molestias rem cum quam exercitationem est, dolore, esse tempore. Architecto libero quas animi dignissimos eos!</div>
              </a>
              <a class="alert__item" href="/news__page.html">
                <div class="alert__title">Новости</div>
                <div class="alert__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptatem ea, sed laudantium dolor corrupti molestias rem cum quam exercitationem est, dolore, esse tempore. Architecto libero quas animi dignissimos eos!</div>
              </a>
              <a class="alert__item" href="/testing.html">
                <div class="alert__title">Тестирование</div>
                <div class="alert__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptatem ea, sed laudantium dolor corrupti molestias rem cum quam exercitationem est, dolore, esse tempore. Architecto libero quas animi dignissimos eos!</div>
              </a>
              <a class="alert__item" href="/news__page.html">
                <div class="alert__title">Новости</div>
                <div class="alert__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptatem ea, sed laudantium dolor corrupti molestias rem cum quam exercitationem est, dolore, esse tempore. Architecto libero quas animi dignissimos eos!</div>
              </a>
              <a class="alert__item" href="/news__page.html">
                <div class="alert__title">Новости</div>
                <div class="alert__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit voluptatem ea, sed laudantium dolor corrupti molestias rem cum quam exercitationem est, dolore, esse tempore. Architecto libero quas animi dignissimos eos!</div>
              </a> */}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default SearchPage;
