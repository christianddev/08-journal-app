import React from 'react';
import { mount } from "enzyme"
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import JournalEntries from '../../../components/journal/JournalEntries';

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
    notes:  [
      {
        id: 'abc',
        title: 'titleXD',
        body: 'bodyXD'
      }
    ]
  }
}
let store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount (
  <Provider store={store}>
    <MemoryRouter>
      <JournalEntries />
    </MemoryRouter>
  </Provider>
)

describe('JournalEntries.js', () => {
  test('should show', () => {
    expect(wrapper).toMatchSnapshot()
  })

})
