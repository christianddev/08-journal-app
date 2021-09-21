import { types } from "../../types/types"

describe('types.js', () => {
  test('should type object', () => {
    const currentTypes = types;
    expect(currentTypes).toEqual({
      login: '[Auth] login',
      logout: '[Auth] logout',
      uiSetError: '[UI] setError',
      uiRemoveSetError: '[UI] removeError',
      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',
      notesAddNote: '[Notes] Add Note',
      notesActive: '[Notes] Set Active Note',
      notesLoad: '[Notes] Updated Note',
      notesUpdated: '[Notes] Updated Image Url',
      notesDelete: '[Notes] Delete note',
      notesLogoutCleaning: '[Notes] Logout Cleaning',
    });
  })
})