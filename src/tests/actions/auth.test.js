import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLoginWithEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {}
let store = mockStore(initState)

const uid = 'zdApKJpUx2NKSoYY80Yhr9eqUnE2'
const displayName = 'userDemo'


describe('auth.tets.js', () => {

  beforeEach(() => {
    store = mockStore(initState)
  })

  test('login & logout should set type', async() => {
    const loginAction = login(uid, displayName)
    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName
      }
    })
    const actionLogout = logout()
    expect(actionLogout).toEqual({
      type: types.logout
    })
  })
  test('startLogout', async() => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.logout
    })
    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning
    })
  })

  test('startLoginWithEmailPassword', async() => {
    const email = 'test@testing.com'
    const password = '123123'
    const uid = 'qPvMuFoWBOTFmdAAzDeE4sRX9Ol1'
    await store.dispatch(startLoginWithEmailPassword(email, password));
    const actions = store.getActions();
    expect(actions[2]).toEqual({
      type: types.login,
      payload: {
        uid: uid,
        displayName: null
      }
    })
  })

})
