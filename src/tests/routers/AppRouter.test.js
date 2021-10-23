import React from 'react';
import { mount } from "enzyme"
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { login } from '../../actions/auth';
import AppRouter from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import { firebase} from '../../firebase/firebase-config'

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

jest.mock('../../actions/auth', () => ({
  login: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
  auth:{},
  ui:{
    loading: false,
    msgError: null
  },
  notes: {
    active: {
      id: 'abc',
    },
    notes:  []
  }
}
let store = mockStore(initState)

store.dispatch = jest.fn()

describe('AppRouter.js', () => {
  test('should call login', async () => {
    await act( async() => {
      await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123123')
      mount (
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      )

    })
    expect(login).toHaveBeenCalledWith('qPvMuFoWBOTFmdAAzDeE4sRX9Ol1', null)
  })
})
