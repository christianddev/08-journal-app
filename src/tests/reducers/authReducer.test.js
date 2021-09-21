import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

describe('authReducer.js', () => {
  test('should login', () => {
    const action = {
      type: types.login,
      payload: {
        uid: 'uiDemo',
        displayName: 'demo'
      }
    }
    const state = authReducer({}, action);
    expect(state).toEqual({
      uid: 'uiDemo',
      name: 'demo'
    })
  })
  test('should logout', () => {
    const initState = {
      uid: 'uidLola',
      name: 'uidName'
    }
    const action = {
      type: types.logout
    }
    const state = authReducer(initState, action);
    expect(state).toEqual({})
  })
  test('should not apply changes', () => {
    const initState = {
      uid: 'uidLola',
      name: 'uidName'
    }
    const action = {
      type: 'demoTypes'
    }
    const state = authReducer(initState, action);
    expect(state).toEqual(initState)
  })

})
