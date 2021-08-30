import { types } from '../types/types';

/*
    {
        notes: [],
        active: null,
        active: {
            id: 'aaa',
            title: '',
            body: '',
            imageUrl: '',
            date: 123123123
        }
    }
*/

const initialState = {
  notes: [],
  active: null,
}

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload
        }
      }
    case types.notesAddNote:
      return {
        ...state,
        notes: [
          action.payload,
          ...state.notes
        ]
      }
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload]
      }
    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((note) => note.id === action.payload.id ? action.payload.note : note)
      }
    case types.notesDelete:
      return {
        ...state,
        active:null,
        notes: state.notes.filter((note) => note.id !== action.payload.id)
      }
    case types.notesLogoutCleaning:
      return {
        ...state,
        active:null,
        notes: null
      }
    default:
      return state;
  }
}