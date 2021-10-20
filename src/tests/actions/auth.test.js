// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import { login, logout } from '../../actions/auth';
import { types } from '../../types/types';
// const middlewares = [thunk]
// const mockStore = configureStore(middlewares)

const uid = 'zdApKJpUx2NKSoYY80Yhr9eqUnE2'
const displayName = 'userDemo'


describe('auth.tets.js', () => {

  // beforeEach(() => {
  //   store = mockStore(initState)
  // })

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

})
