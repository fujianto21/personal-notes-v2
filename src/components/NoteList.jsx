import React from 'react';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

function NoteList({ notes }) {
  const { selectLanguage } = React.useContext(LocaleContext);
  return (
    <div>
      {notes?.length > 0 ? (
        <section className='notes-list'>
          {notes.map(({ id, title, body, createdAt }) => (
            <NoteItem key={id} id={id} title={title} body={body} createdAt={createdAt} />
          ))}
        </section>
      ) : (
        <section className='notes-list-empty'>
          <p className='notes-list__empty'>
            {selectLanguage({ id: 'Tidak ada catatan yang tersedia.', en: 'No notes available.' })}
          </p>
        </section>
      )}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default NoteList;
