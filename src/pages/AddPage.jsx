import React from 'react';
import NoteInput from '../components/NoteInput';
import ButtonAction from '../components/ButtonAction';
import LocaleContext from '../contexts/LocaleContext';
import { addNote } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

function AddPage() {
  const { selectLanguage } = React.useContext(LocaleContext);
  const navigate = useNavigate();
  const [newNote, setNewNote] = React.useState({
    title: '',
    body: ''
  });

  function onTitleChangeEventHandler(event) {
    setNewNote((prevNewNote) => {
      return {
        ...prevNewNote,
        title: event.target.value
      };
    });
  }

  function onBodyInputEventHandler(event) {
    setNewNote((prevNewNote) => {
      return {
        ...prevNewNote,
        body: event.target.innerHTML
      };
    });
  }

  async function onSaveNoteHandler() {
    await addNote(newNote);
    navigate('/');
  }

  return (
    <section className='add-new-page'>
      <NoteInput state={newNote} onTitleChange={onTitleChangeEventHandler} onBodyInput={onBodyInputEventHandler} />
      <div className='add-new-page__action'>
        <ButtonAction
          title={selectLanguage({ id: 'Simpan', en: 'Save' })}
          onClick={onSaveNoteHandler}
          icon={<FiCheck />}
        />
      </div>
    </section>
  );
}

export default AddPage;
