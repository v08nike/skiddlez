import { call, put, select } from 'redux-saga/effects'
// import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router'

import { pathsMatchSelector } from '../../../selectors'
import Paths from '../../../constants/Paths'

export function* goToDefaultService() {
  yield put(push(Paths.DEFAULT))
}

export function* goToRootService() {
  yield put(push(Paths.ROOT))
}

export function* locationChangedService() {
  const pathsMatch = yield select(pathsMatchSelector)

  if (!pathsMatch) {
    return
  }

  // case Paths.PROJECTS:
  switch (pathsMatch.path) {
    case Paths.ROOT:
    case Paths.BOARDS:
    case Paths.CARDS:
      yield call(goToDefaultService)

      break
    default:
  }
}
