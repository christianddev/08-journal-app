import { types } from "../types/types"

export const serError = (error) => ({
  type: types.uiSetError,
  payload: error
})

export const removeError = () => ({
  type: types.uiRemoveSetError
})

export const startLoading= () => ({
  type: types.uiStartLoading
})

export const finishLoading = () => ({
  type: types.uiFinishLoading
})