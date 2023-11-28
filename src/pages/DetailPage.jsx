import React from 'react';
import ButtonAction from '../components/ButtonAction';
import NoteDetail from '../components/NoteDetail';
import Loading from '../components/Loading';
import LocaleContext from '../contexts/LocaleContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { FiTrash2 } from 'react-icons/fi';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';

function DetailPage() {
  const { selectLanguage } = React.useContext(LocaleContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
      setLoading(false);
    });
  }, []);

  async function deleteNotenHandler() {
    await deleteNote(id);
    note.archived ? navigate('/archives') : navigate('/');
  }

  async function archiveNotenHandler() {
    await archiveNote(id);
    navigate('/');
  }

  async function unarchiveNoteHandler() {
    await unarchiveNote(id);
    navigate('/archives');
  }

  if (loading) {
    return <Loading />;
  }

  if (note === null) {
    return (
      <p>
        {selectLanguage({ id: `Note dengan ID "${id}" tidak tersedia.`, en: `Note with ID "${id}" not available.` })}
      </p>
    );
  }

  return (
    <section>
      <NoteDetail {...note} />
      <div className='detail-page__action'>
        <ButtonAction
          title={
            note.archived
              ? selectLanguage({ id: 'Aktifkan', en: 'Activate' })
              : selectLanguage({ id: 'Arsipkan', en: 'Archive' })
          }
          onClick={note.archived ? unarchiveNoteHandler : archiveNotenHandler}
          icon={note.archived ? <BiArchiveOut /> : <BiArchiveIn />}
        />
        <ButtonAction
          title={selectLanguage({ id: 'Hapus', en: 'Delete' })}
          onClick={deleteNotenHandler}
          icon={<FiTrash2 />}
        />
      </div>
    </section>
  );
}

export default DetailPage;
