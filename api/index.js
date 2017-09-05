import makeApiRequest from './makeApiRequest'
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  trainerFetchSuccess,
  trainerFetchFailure,
} from '../app/actions'

export function loginUser(dispatch, creds) {
  dispatch(loginRequest(creds))

  // call api then dispaych success or failure
  makeApiRequest('/api/login', 'POST', creds, false, function(data) {
    localStorage.setItem('id_token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    dispatch(loginSuccess(data))
  }, function(error) {
    dispatch(loginFailure(error.message))
  })
}

export function logoutUser(dispatch) {
  localStorage.removeItem('id_token')
  localStorage.removeItem('user')
  
  dispatch(logoutSuccess())
}

export function fetchTrainers(dispatch) {
  makeApiRequest('/api/trainers', 'GET', null, true, (data) => {
    dispatch(trainerFetchSuccess(data))
  }, (error) => {
    dispatch(trainerFetchFailure(error.message))
  })
}
