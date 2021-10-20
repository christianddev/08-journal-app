
import Swal from 'sweetalert2';
import {db} from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';


export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
})

export const addNewNote = (id, note) => ({
  type: types.notesAddNote,
  payload:{
    id,
    ...note
  }
})

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const {auth: {uid}} = getState();
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    try {
      const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
      dispatch(activeNote(doc.id, newNote));
      dispatch(addNewNote(doc.id, newNote));
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  }
}

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const {auth: {uid}} = getState();
    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = {...note};
    delete noteToFirestore.id;
    try {
      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
      dispatch(refreshNote(note.id, noteToFirestore));
      Swal.fire({
        title: 'Saved',
        text: note.title,
        icon: 'success'
      });
    } catch (error) {
      Swal.fire({
        title: error?.code,
        text: error?.message,
        icon: 'error'
      });
      console.error('error startSaveNote: ', error);
    }
  }
}

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id, note: {
      id,
      ...note
    }
  }
})

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const {notes: {active: note}} = getState();
    Swal.fire({
      title: 'Uploading',
      text: 'Please wait',
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
    const fileUrl = await fileUpload(file);

    Swal.close();

    note.url = fileUrl;
    dispatch(startSaveNote(note));

  }
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: {
    id
  }
})

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    try {
      await db.doc(`${uid}/journal/notes/${id}`).delete()
      dispatch(deleteNote(id));
      Swal.fire({
        title: 'Deleted',
        text: 'Picture',
        icon: 'success'
      });
    } catch (error) {
      Swal.fire({
        title: error?.code,
        text: error?.message,
        icon: 'error'
      });
      console.error('error startDeleting: ', error);
    }
  }
}

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});

