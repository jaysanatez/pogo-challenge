import makeApiRequest from './makeApiRequest'
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  trainerFetchSuccess,
  trainerFetchFailure,
  createTrainerSuccess,
  createTrainerFailure,
} from '../app/actions'

export function loginUser(dispatch, creds) {
  // call api then dispaych success or failure
  makeApiRequest('/api/login', 'POST', creds, false, function(data) {
    localStorage.setItem('id_token', data.token)
    localStorage.setItem('user', JSON.stringify(data.trainer))

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

export function createTrainer(dispatch, trainerData) {
  makeApiRequest('/api/trainer', 'POST', trainerData, true, (data) => {
    dispatch(createTrainerSuccess(data))
  }, (error) => {
    dispatch(createTrainerFailure(error.message))
  })
}
