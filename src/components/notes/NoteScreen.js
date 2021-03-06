import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/userForm';
import NoteAppBar from './NoteAppBar';

const NoteScreen = () => {

  const dispatch = useDispatch();
  const { active: note } = useSelector(state => state.notes);
  let [formValues, handleInputChange, reset] = useForm(note);
  const { body, title } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset])

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }))
  }, [formValues, dispatch])

  const handleClickDelete = () => {
    dispatch(startDeleting(formValues.id));
  }

  return (
    <div className="notes__main-content">
      <NoteAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {
          note.url && (
            <div className="notes__image">
              <img
                src={note.url}
                alt="note_image"
              />
            </div>
          )
        }
      </div>
      <button
        className="btn btn-sanger"
        onClick={handleClickDelete}
      >
        Delete
      </button>
    </div>
  )
}

export default NoteScreen;
