import React from 'react';
const Loading = ({ style, overlay }) => {
  return (
    <div
      class="overlay-loading"
      style={{
        ...(overlay && {
          backgroundColor: 'rgba(0,0,0,0.3)',
        }),
      }}>
      <div class="lds-spinner" style={style}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
