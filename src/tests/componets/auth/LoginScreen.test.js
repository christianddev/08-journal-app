import React from 'react';
import { mount } from "enzyme"
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginScreen from "../../../components/auth/LoginScreen"
import '@testing-library/jest-dom';
import { startLoginGoogle, startLoginWithEmailPassword } from '../../../actions/auth';
jest.mock('../../../actions/auth', () => ({
  startLoginGoogle: jest.fn(),
  startLoginWithEmailPassword: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
  auth:{},
  ui:{
    loading: false,
    msgError: null
  }
}
let store = mockStore(initState)

store.dispatch = jest.fn()

const wrapper = mount (
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
)

describe('loginScreen.js', () => {

  beforeEach(() => {
    store = mockStore(initState)
    jest.clearAllMocks()
  })

  test('should show', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should trigger startLoginGoogle', () => {
    wrapper.find('.google-btn').prop('onClick')()
    expect(startLoginGoogle).toHaveBeenCalled()
  })

  test('should no call startLoginWithEmailPassword', () => {
    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    });
    expect(startLoginWithEmailPassword).not.toHaveBeenCalled()
  })
  test('should call startLoginWithEmailPassword', () => {

    const eventEmail = {
      target: {
        value: 'email@email.com',
        name: "email"
      }
    };
    wrapper.find("#inputEmail").simulate("change", eventEmail);
    const eventPassword = {
      target: {
        value: '123123',
        name: "password"
      }
    };
    wrapper.find("#inputPassword").simulate("change", eventPassword);

    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    });
    expect(startLoginWithEmailPassword).toHaveBeenCalledWith(eventEmail.target.value, eventPassword.target.value)


  })


})
