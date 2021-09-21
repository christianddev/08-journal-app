import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const store = mockStore({
  auth: {
    uid: 'testUID'
  }
});

describe('notes.js', () => {
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

})
