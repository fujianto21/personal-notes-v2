import React from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

function SearchBar({ keyword, keywordChange }) {
  const { selectLanguage } = React.useContext(LocaleContext);
  return (
    <section className='search-bar'>
      <input
        type='text'
        placeholder={selectLanguage({ id: 'Cari berdasarkan judul ...', en: 'Search by title...' })}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </section>
  );
}

SearchBar.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired
};

export default SearchBar;
