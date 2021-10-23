import React from 'react';
import { mount } from "enzyme"
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { activeNote } from '../../../actions/notes';
import NoteScreen from '../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn(),
  startDeleting: jest.fn(),
  startSaveNote: jest.fn()
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
      title: 'titleXD',
      body: 'bodyXD'
    },
    notes:  []
  }
}
let store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount (
  <Provider store={store}>
    <MemoryRouter>
      <NoteScreen />
    </MemoryRouter>
  </Provider>
)

describe('NoteScreen.js', () => {
  test('should show', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should call activeNote', () => {
    const event = {
      target: {
        name: 'title',
        value: 'titleDemo'
      }
    }
    wrapper.find('input[name="title"]').simulate("change", event);
    expect(activeNote).toHaveBeenLastCalledWith(
      'abc',
      {
        id: 'abc',
        title: 'titleDemo',
        body: 'bodyXD'
      }
    )
  })


})
