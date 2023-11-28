import React from 'react';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import LocaleContext from '../contexts/LocaleContext';
import { getArchivedNotes } from '../utils/network-data';
import { useSearchParams } from 'react-router-dom';

function ArsipPage() {
  const { selectLanguage } = React.useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || '';
  });

  React.useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter(({ title }) => {
    return title.toLowerCase().includes(keyword.toLowerCase());
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <section className='homepage'>
      <h2>{selectLanguage({ id: 'Catatan Arsip', en: 'Archived Note' })}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
    </section>
  );
}

export default ArsipPage;
