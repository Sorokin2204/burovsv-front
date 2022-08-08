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
const ModalNews = () => {
  const [successCreateNewsFilter, setSuccessCreateNewsFilter] = useState(false);
  const defaultValues = {
    title: '',
    image: '',
    desc: null,
    descShort: '',
    newsFilterId: '',
    newsTypeId: 1,
    posts: [],
    dateEnd: '',
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

  const filterForm = useForm({
    deafultValues: {
      name: '',
    },
  });
  const {
    getPosts: { data: posts, loading: postsLoading },
  } = useSelector((state) => state.post);
  const {
    getNewsTypes: { data: newsTypes, loading: newsTypesLoading },
  } = useSelector((state) => state.newsType);
  const {
    getNewsFilters: { data: newsFilters, loading: newsFiltersLoading },
    createNewsFilter: { data: createNewsFilterData, loading: createNewsFilterLoading },
  } = useSelector((state) => state.newsFilter);
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [postCheckboxView, setPostCheckboxView] = useState([]);
  // const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setValue('desc', currentContentAsHTML);
  };

  const covertNewsToFormData = ({ title, image, desc, descShort, newsFilterId, newsTypeId, posts, dateEnd }) => {
    const postIds = posts?.filter((post) => post).map((postId) => parseInt(postId));
    return {
      title,
      desc,
      descShort,
      dateEnd,
      image,
      filterId: newsFilterId,
      postIds,
    };
  };

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    const formatData = covertNewsToFormData(data);
    Object.keys(formatData).map(function (key, index) {
      formData.append(key, formatData[key]);
    });
    dispatch(createNews(formData));
    dispatch(setActiveModal(''));
  };

  useEffect(() => {
    dispatch(getNewsTypes());
    dispatch(getNewsFilters());
    dispatch(getPosts());
    register('desc', { required: true });
    register('image', { required: true });
  }, []);

  useEffect(() => {
    if (createNewsFilterData) {
      dispatch(getNewsFilters());
      filterForm.setValue('name', '');
      setSuccessCreateNewsFilter(true);
      setTimeout(() => {
        setSuccessCreateNewsFilter(false);
      }, 3000);
    }
  }, [createNewsFilterData]);

  const newsTypeId = watch('newsTypeId');
  const watchImage = watch('image');
  // const watchPosts = watch('posts');
  // console.log(watchPosts?.filter((watchPost) => watchPost)?.length === 0);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value?.posts?.filter((watchPost) => watchPost)?.length === 0) {
        setError('posts', { type: 'emptyPosts' });
      } else {
        clearErrors('posts');
      }
      const dateEndFormat = moment(value?.dateEnd, 'DD.MM.YYYY');
      var startDate = moment(new Date(), 'DD.MM.YYYY');
      var endDate = moment('01.01.2025', 'DD.MM.YYYY');
      const isValidDate = dateEndFormat.isValid();
      const isBetweenDate = dateEndFormat.isBetween(startDate, endDate);
      console.log();
      if (!isValidDate || !isBetweenDate) {
        setError('dateEnd', { type: 'invalidDate' });
      } else {
        clearErrors('dateEnd');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  console.log(errors);
  // useEffect(() => {
  //   if (newsTypes?.length !== 0) {
  //     setValue('newsFilterId', newsFilters?.filter((newsFilter) => newsFilter?.newsTypeId == getValues('newsTypeId'))[0]?.id);
  //   }
  // }, [newsTypes]);
  const onAddNewsFilter = (data) => {
    dispatch(createNewsFilter({ name: data?.name, newsTypeId: getValues('newsTypeId') }));
  };
  useEffect(() => {
    if (posts?.length !== 0) {
      const postsView = posts?.map(({ name, id }) => ({ label: name, value: id }));
      setPostCheckboxView(postsView);
    }
  }, [posts]);
  const [prevImage, setPrevImage] = useState();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setPrevImage(URL.createObjectURL(file));
    setValue('image', file);
  };
  const hiddenFileInput = React.useRef(null);
  const onClickUpload = () => {
    hiddenFileInput.current.click();
  };
  return (
    <>
      <Modal title="Добавление тестирование" onSave={handleSubmit(onSubmit)} disabled={newsFiltersLoading}>
        <div style={{ minHeight: '300px', position: 'relative' }}>
          {!newsTypesLoading && !postsLoading && !newsFiltersLoading ? (
            <div>
              <div className="modal__select">
                <select placeholder="Должность" {...register('newsTypeId', { required: true })}>
                  {newsTypes?.map(({ name, id }) => (
                    <option value={id}>{name}</option>
                  ))}
                </select>
              </div>
              {newsTypeId == '1' && (
                <>
                  {watchImage && prevImage ? (
                    <div className="upload-image">
                      <img src={prevImage} />
                    </div>
                  ) : (
                    <>
                      <div className="upload" onClick={() => onClickUpload()}>
                        <img src="/img/modal/image.svg" />
                      </div>
                    </>
                  )}
                  <input type="file" onChange={onImageChange} style={{ display: 'none' }} ref={hiddenFileInput} />
                  <button className="modal__btn" style={{ marginBottom: '20px', marginTop: '10px' }} onClick={() => onClickUpload()}>
                    {watchImage && prevImage ? 'Изменить картинку' : 'Загрузить картинку'}
                  </button>
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
                </>
              )}
              <input type="text" placeholder="Заголовок новости" {...register('title', { required: true })} />
              <textarea placeholder="Краткое описание" rows="3" {...register('descShort', { required: true })}></textarea>
              <Editor
                defaultEditorState={editorState}
                onEditorStateChange={handleEditorChange}
                editorClassName="modal__editor"
                toolbar={{ options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'], history: { inDropdown: true } }}
              />{' '}
              <div className="modal__select">
                <select {...register('newsFilterId', { required: true })}>
                  <option value={''} selected>
                    Выберите фильтр
                  </option>
                  {newsFilters?.map((newFilter) => {
                    if (newsTypeId == newFilter?.newsTypeId) {
                      return <option value={newFilter?.id}>{newFilter?.name}</option>;
                    }
                  })}
                </select>
              </div>{' '}
              <div class="text-error" style={{ marginBottom: '10px' }}>
                {filterForm.formState?.errors?.name && 'Введите название фильтра'}
              </div>
              <div class="text-success" style={{ marginBottom: '10px' }}>
                {successCreateNewsFilter && 'Фильтр добавлен'}
              </div>
              <div className="modal__create">
                <input type="text" placeholder="Добавить фильтр" {...filterForm.register('name', { required: true })} autoComplete="off" />

                <button onClick={filterForm.handleSubmit(onAddNewsFilter)} disabled={successCreateNewsFilter}>
                  <img src="/img/modal/plus.svg" />
                </button>
              </div>
              <div className="">
                <CheckboxGroup name="posts" list={postCheckboxView} register={register} />
              </div>
              <div
                class="text-error"
                style={{
                  marginTop: '20px',
                  marginBottom: '20px',
                }}>
                {' '}
                {Object.keys(errors).length !== 0 && 'Заполните следующие поля:'}
                <div>{errors?.image && '- Загрузите изображение'}</div>
                <div>{errors?.dateEnd && '- Неверный формат даты'}</div>
                <div>{errors?.title && '- Заголовок'}</div>
                <div>{errors?.descShort && '- Краткое описание'}</div>
                <div>{errors?.desc && '- Полное описание'}</div>
                <div>{errors?.newsFilterId && '- Фильтр'}</div>
                <div>{errors?.posts && '- Должности'}</div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
          {(createNewsFilterLoading || newsFiltersLoading) && <Loading style={{ top: 'auto', bottom: '54px', transform: 'translate(-50%, -50%) scale(50%)' }} />}
        </div>
      </Modal>
    </>
  );
};

export default ModalNews;
