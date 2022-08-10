import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { setActiveModal } from '../../redux/slices/app.slice';
const Modal = ({ children, onSave, onClose, title, disabled }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="overlay-modal"
        onClick={() => {
          dispatch(setActiveModal(''));
          onClose?.();
        }}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal__title">{title}</div>
          <div className="modal__body">{children}</div>
          <div className="modal__footer">
            <button className="modal__btn" disabled={disabled} onClick={onSave}>
              Сохранить
            </button>
            <button
              className="modal__btn"
              onClick={() => {
                dispatch(setActiveModal(''));
                onClose?.();
              }}
              disabled={disabled}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
