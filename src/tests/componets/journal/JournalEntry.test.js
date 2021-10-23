import React from 'react';
import { mount } from "enzyme"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import JournalEntry from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {}
let store = mockStore(initState)
store.dispatch = jest.fn()

const note = {
  id: 123,
  date: 123,
  body: 'bodyDeml',
  title: "titleDemo",
  url: "urlDemo"
}

const wrapper = mount (
  <Provider store={store}>
    <JournalEntry {...note} />
  </Provider>
)

describe('JournalEntry.js', () => {
  test('should show', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should set active note', () => {
    wrapper.find('.journal__entry').prop('onClick')()
    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(note.id, {...note})
    )
  })
})
