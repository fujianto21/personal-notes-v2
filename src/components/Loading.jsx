import React from 'react';
import ThemeContext from '../contexts/ThemeContext';

function Loading() {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className='loader-container'>
      <img src={theme === 'dark' ? '/images/loader-white.gif' : '/images/loader-black.gif'} className='loader' />
    </div>
  );
}

export default Loading;
