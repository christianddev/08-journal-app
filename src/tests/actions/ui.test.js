import { finishLoading, removeError, serError, startLoading } from "../../actions/ui"
import { types } from "../../types/types"

describe('ui.js', () => {
  test('should run all actions', () => {
    const error = 'errorXD'
    const setErrorAction = serError(error)
    const removeErrorAction = removeError()
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();

    expect(setErrorAction).toEqual({
      type: types.uiSetError,
      payload: error
    })
    expect(removeErrorAction).toEqual({
      type: types.uiRemoveSetError
    })
    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading
    })
    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading
    })
  })

})
