 /** * @jest-environment node */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  auth: {
    uid: 'testUID'
  },
  notes: {
    active: {
      id: 'B06eTstF8i8lOKR6esjE',
      title: 'titleDemo',
      body: 'bodyDemo'
    }
  }
}

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn( () => {
      return 'https://hola-mundo.com/cosa.jpg';
      // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
  })
}))


let store = mockStore(initState);

describe('notes.js', () => {

  beforeEach(() => {
    store = mockStore(initState)
  })

  test('should create new note (startNewNote)', async () => {
    await store.dispatch(startNewNote());
    const uid = store.getState().auth.uid;
    const actions = store.getActions()
    // console.log('actions', actions)
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    })


    expect(actions[1]).toEqual({
      type: types.notesAddNote,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    })

    actions.forEach(async(action) => {
      await db.doc(`${uid}/journal/notes/${action?.payload?.id}`).delete()
    });

  })

  test('should load notes (startLoadingNotes)', async() => {
    const uid = store.getState().auth.uid;
    await store.dispatch(startLoadingNotes(uid))
    const actions = store.getActions()
    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    }

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    })
    expect(actions[0].payload[0]).toMatchObject(expected)
  })

  test('should update note (startSaveNote)', async() => {
    const uid = store.getState().auth.uid;

    const note = {
      id: 'B06eTstF8i8lOKR6esjE',
      title: 'title',
      body: 'body'
    }

    await store.dispatch(startSaveNote(note))
    const actions = store.getActions()

    expect(actions[0].type).toBe(types.notesUpdated)
    const docRef = await db.doc(`${uid}/journal/notes/${note.id}`).get()

    expect(docRef.data().title).toBe(note.title)
    expect(docRef.data().body).toBe(note.body)
  })

  // test('should update URL entry (startUploading)', async() => {
  //   const file = new File([], 'picture.jpg')
  //   await store.dispatch( startUploading(file))
  // })

})
