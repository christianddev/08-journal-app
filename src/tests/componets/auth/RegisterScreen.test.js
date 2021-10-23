import React from 'react';
import { mount } from "enzyme"
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RegisterScreen from '../../../components/auth/RegisterScreen';
import '@testing-library/jest-dom';
import { types } from '../../../types/types';

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

const wrapper = mount (
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
)

describe('RegisterScreen.js', () => {

  test('should show', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should call dispatch action', () => {
    const eventName = {
      target: {
        value: '',
        name: "name"
      }
    };
    wrapper.find('input[name="name"]').simulate("change", eventName);

    wrapper.find('form').simulate('submit',{
      preventDefault(){}
    });
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Name is required'
    })
  })

  test('should show msgError', () => {
    const initState = {
      auth:{},
      ui:{
        loading: false,
        msgError: 'Invalid email'
      }
    }
    const store = mockStore(initState)
    const wrapper = mount (
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.find('.auth__alert-error').exists()).toBe(true)
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initState.ui.msgError)
  })
})
