import React from 'react';
import { mount } from "enzyme"
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import Sidebar from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';


jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn()
}))
jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn()
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

const wrapper = mount (
  <Provider store={store}>
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  </Provider>
)

describe('Sidebar.js', () => {
  test('should show', () => {
    expect( wrapper).toMatchSnapshot()
  })
  test('should call logout', () => {
    wrapper.find('.journal__new-entry').prop('onClick')()
    expect(startNewNote).toHaveBeenCalled()
  })
  test('should startLogout', () => {
    wrapper.find('button').prop('onClick')()
    expect(startLogout).toHaveBeenCalled()
  })
})
