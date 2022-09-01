import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeUser } from '../redux/actions/employee/getEmployeeUser.action';
import { uploadAvatar } from '../redux/actions/employee/uploadAvatar.action';
const Info = () => {
  const {
    getEmployeeUser: { data: employee },
    uploadAvatar: { data: uploadAvatarData },
  } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const onImageChange = (e) => {
    const [file] = e.target.files;
    const formData = new FormData();
    formData.append('image', file);
    dispatch(uploadAvatar(formData));
  };

  useEffect(() => {
    dispatch(getEmployeeUser());
  }, [uploadAvatarData]);

  const hiddenFileInput = React.useRef(null);
  const onClickUpload = () => {
    hiddenFileInput.current.click();
  };
  return (
    employee && (
      <div class="info">
        <div class="personal">
          <div class="personal__avatar">
            <a onClick={onClickUpload}>
              <img src={employee?.image ? `${process.env.REACT_APP_SERVER_URL}/images/${employee?.image}` : '/img/account.jpg'} alt="" style={{ height: '60px', width: '60px', objectFit: 'cover' }} />
              <input type="file" onChange={onImageChange} style={{ display: 'none' }} ref={hiddenFileInput} />
            </a>
          </div>
          <div class="personal__name">{`${employee?.firstName} ${employee?.lastName}`}</div>
          <div class="personal__post">{employee?.post}</div>
          <div class="personal__city">{employee?.subdivision}</div>
          {(employee?.postSubdivision?.postId == process.env.REACT_APP_SELLER_ID || employee?.postSubdivision?.postId == process.env.REACT_APP_MANAGER_ID) && <a class="personal__btn">Подробнее</a>}
        </div>
      </div>
    )
  );
};

export default Info;
