import { call, put, select } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { pathsMatchSelector } from '../../../selectors'
import Paths from '../../../constants/Paths'

export function* goToDefaultService() {
  yield put(push(Paths.DEFAULT))
}

export function* goToRootService() {
  yield put(push(Paths.ROOT))
}

export function* handleLocationChangeService() {
  const pathsMatch = yield select(pathsMatchSelector)

  if (!pathsMatch) {
    return
  }

  switch (pathsMatch.path) {
    case Paths.ROOT:
    case Paths.BOARDS:
    case Paths.CARDS:
    case Paths.PROJECTS:
      yield call(goToDefaultService)

      break
    default:
  }
}
