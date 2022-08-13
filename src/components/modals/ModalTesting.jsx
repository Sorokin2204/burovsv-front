import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import Modal from './Modal';
import { setActiveModal } from '../../redux/slices/app.slice';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { useForm, Controller } from 'react-hook-form';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import CheckboxGroup from '../CheckboxGroup';
import { getNewsTypes } from '../../redux/actions/newsType/getNewsTypes.action';
import Loading from '../Loading';
import { getNewsFilters } from '../../redux/actions/newsFilter/getNewsFilters.action';
import { createNewsFilter } from '../../redux/actions/newsFilter/createNewsFilter.action';
import { getPosts } from '../../redux/actions/post/getPosts.action';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { createNews } from '../../redux/actions/news/createNews.action';
import { getSubdivisions } from '../../redux/actions/subdivision/getSubdivisions.action';
import axios from 'axios';
import { getSubdivisionsWithPosts } from '../../redux/actions/subdivision/getSubdivisionWithPosts.action';
import { getCatsByPostAndSubdiv } from '../../redux/actions/category/getCatsByPostAndSubdiv';
import { resetGetSubdivisionsWithPosts } from '../../redux/slices/subdivision.slice';
import { resetGetCatsByPostAndSubdiv } from '../../redux/slices/category.slice';
import { createTesting } from '../../redux/actions/testing/createTesting.action';
import { resetGetAdminTestingSingle } from '../../redux/slices/testing.slice';
import { updateTesting } from '../../redux/actions/testing/updateTesting.action';
const ModalTesting = () => {
  const [successCreateNewsFilter, setSuccessCreateNewsFilter] = useState(false);
  const defaultValues = {
    name: '',
    desc: '',
    dateEnd: '',
    linkTest: '',
    categoryId: '',
    postId: '',
    subdivisionId: '',
  };
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
    getCatsByPostAndSubdiv: { data: categories, loading: categoriesLoading },
  } = useSelector((state) => state.category);
  const {
    getSubdivisions: { data: subdivisions, loading: subdivisionsLoading },
    getSubdivisionsWithPosts: { data: subdivisionPosts, loading: subdivisionPostsLoading },
  } = useSelector((state) => state.subdivision);

  const {
    getAdminTestingSingle: { data: testingSingle, loading: testingSingleLoading },
  } = useSelector((state) => state.testing);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    if (testingSingle) {
      dispatch(updateTesting({ ...data, id: testingSingle?.id }));
    } else {
      dispatch(createTesting(data));
    }

    dispatch(setActiveModal(''));
  };

  useEffect(() => {
    dispatch(getSubdivisions());
  }, []);
  useEffect(() => {
    const isInitSubdiv = testingSingle?.subdivision?.subdivisionId == getValues('subdivisionId');

    if (subdivisions?.length !== 0 && !subdivisionsLoading && isInitSubdiv) {
      setValue('subdivisionId', testingSingle?.subdivision?.subdivisionId);
      setValue('postId', testingSingle?.subdivision?.postId);
    }
  }, [subdivisions, subdivisionsLoading]);
  useEffect(() => {
    const isInitPost = testingSingle?.subdivision?.postId == getValues('postId');
    const allValid = getValues('subdivisionId') && getValues('postId');
    if (subdivisionPosts?.posts?.length !== 0 && !subdivisionPostsLoading && allValid && isInitPost) {
      setValue('postId', testingSingle?.subdivision?.postId);
      setValue('categoryId', testingSingle?.categoryPostSubdivision?.categoryId);
    }
  }, [subdivisionPosts, subdivisionPostsLoading]);
  useEffect(() => {
    const isInitCat = testingSingle?.categoryPostSubdivision?.categoryId == getValues('categoryId');
    const allValid = getValues('subdivisionId') && getValues('postId') && getValues('categoryId');

    if (categories?.categories?.length !== 0 && !categoriesLoading && allValid && isInitCat) {
      setValue('categoryId', testingSingle?.categoryPostSubdivision?.categoryId);
    }
  }, [categories, categoriesLoading]);
  useEffect(() => {
    if (testingSingle) {
      setValue('name', testingSingle?.name);
      setValue('desc', testingSingle?.desc);
      setValue('dateEnd', moment(testingSingle?.dateEnd).format('DD.MM.YYYY'));
      setValue('linkTest', testingSingle?.linkTest);
      setValue('subdivisionId', testingSingle?.subdivision?.subdivisionId);
      setValue('postId', testingSingle?.subdivision?.postId);
      setValue('categoryId', testingSingle?.categoryPostSubdivision?.categoryId);
    }
  }, [testingSingle]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log('SCHAGNE ');
      if (value?.subdivisionId && name === 'subdivisionId') {
        dispatch(getSubdivisionsWithPosts({ id: value?.subdivisionId }));

        dispatch(resetGetCatsByPostAndSubdiv());
        setValue('postId', '');
        setValue('categoryId', '');
      }
      if (!value?.postId && name === 'postId') {
        dispatch(resetGetCatsByPostAndSubdiv());
        setValue('categoryId', '');
      }
      if (value?.postId && name === 'postId') {
        dispatch(getCatsByPostAndSubdiv({ postId: value?.postId, subdivisionId: value?.subdivisionId }));

        setValue('categoryId', '');
      }
      const dateEndFormat = moment(value?.dateEnd, 'DD.MM.YYYY');
      var startDate = moment(new Date(), 'DD.MM.YYYY');
      var endDate = moment('01.01.2025', 'DD.MM.YYYY');
      const isValidDate = dateEndFormat.isValid();
      const isBetweenDate = dateEndFormat.isBetween(startDate, endDate);
      if (!isValidDate || !isBetweenDate) {
        setError('dateEnd', { type: 'invalidDate' });
      } else {
        clearErrors('dateEnd');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <Modal
        title="Добавление тестирование"
        onSave={handleSubmit(onSubmit)}
        onClose={() => {
          dispatch(resetGetAdminTestingSingle());
        }}>
        <div style={{ minHeight: '400px', position: 'relative' }}>
          {!testingSingleLoading ? (
            <div>
              <input type="text" placeholder="Заголовок теста" {...register('name', { required: true, maxLength: 40 })} />

              <div className="date">
                <div className="date__wrap">
                  <div className="date__title">от:</div>
                  <input type="text" value={moment(new Date()).format('DD.MM.YYYY')} disabled />
                </div>

                <div className="date__wrap">
                  <div className="date__title">до:</div>
                  <Controller
                    control={control}
                    name={'dateEnd'}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, name, value } }) => <NumberFormat format="##.##.####" mask="_" name={name} value={value} placeholder={'01.01.2022'} onChange={onChange} autoComplete="off" />}
                  />
                </div>
              </div>

              <textarea placeholder="Краткое описание" rows="3" {...register('desc', { required: true })}></textarea>
              <input
                type="text"
                placeholder="Ссылка на тест"
                {...register('linkTest', {
                  required: true,
                  pattern: {
                    value: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                    message: 'invalid url',
                  },
                })}
              />
              <div className="modal__select">
                <select {...register('subdivisionId', { required: true })}>
                  <option value={''} selected>
                    Выберите подразделение
                  </option>
                  {subdivisions?.map((subdiv) => (
                    <option value={subdiv?.id}>{subdiv?.name}</option>
                  ))}
                </select>
              </div>
              <div className="modal__select">
                <select {...register('postId', { required: true })} disabled={!subdivisionPosts?.posts || subdivisionPosts?.posts?.length == 0 || subdivisionPostsLoading}>
                  <option value={''} selected>
                    Выберите должность
                  </option>
                  {subdivisionPosts?.posts?.map((post) => (
                    <option value={post?.id}>{post?.name}</option>
                  ))}
                  {/* {newsFilters?.map((newFilter) => {
                    if (newsTypeId == newFilter?.newsTypeId) {
                      return <option value={newFilter?.id}>{newFilter?.name}</option>;
                    }
                  })} */}
                </select>
              </div>
              <div className="modal__select">
                <select {...register('categoryId', { required: true })} disabled={!categories?.categories || categories?.categories?.length == 0 || categoriesLoading}>
                  <option value={''} selected>
                    Выберите категорию
                  </option>
                  {categories?.categories?.map((cat) => (
                    <option value={cat?.id}>{cat?.name}</option>
                  ))}
                  {/* {newsFilters?.map((newFilter) => {
                    if (newsTypeId == newFilter?.newsTypeId) {
                      return <option value={newFilter?.id}>{newFilter?.name}</option>;
                    }
                  })} */}
                </select>
              </div>
              <div
                class="text-error"
                style={{
                  marginBottom: '20px',
                }}>
                {' '}
                {Object.keys(errors).length !== 0 && 'Заполните следующие поля:'}
                <div>{errors?.dateEnd && '- Неверный формат даты'}</div>
                <div>{errors?.name && '- Заголовок'}</div>
                <div>{errors?.desc && '- Краткое описание'}</div> <div>{errors?.linkTest && '- Ссылка на тест'}</div>
                <div>{errors?.subdivisionId && '- Подразделение'}</div> <div>{errors?.postId && '- Должность'}</div> <div>{errors?.categoryId && '- Категория'}</div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
          {false && <Loading style={{ top: 'auto', bottom: '54px', transform: 'translate(-50%, -50%) scale(50%)' }} />}
        </div>
      </Modal>
    </>
  );
};

export default ModalTesting;
