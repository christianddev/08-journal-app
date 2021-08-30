import {db} from '../firebase/firebase-config';


export const loadNotes = async (uid) => {
  const notes = [];
  const notesSnap = await db.collection(`${uid}/journal/notes`).get();

  notesSnap.forEach((note) => {
    notes.push({
      id: note.id,
      ...note.data()
    })
  })

  return notes;
}