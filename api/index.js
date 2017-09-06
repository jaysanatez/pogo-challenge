import makeApiRequest from './makeApiRequest'
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  trainerFetchSuccess,
  trainerFetchFailure,
  createTrainerSuccess,
  createTrainerFailure,
  deleteTrainerSuccess,
  deleteTrainerFailure,
  ensureTrainerSuccess,
  ensureTrainerFailure,
  verifyTrainerSuccess,
  verifyTrainerFailure,
} from '../app/actions'

export function loginTrainer(dispatch, creds) {
  // call api then dispatch success or failure
  makeApiRequest('/api/login', 'POST', creds, false, data => {
    localStorage.setItem('id_token', data.token)
    localStorage.setItem('trainer', JSON.stringify(data.trainer))

    dispatch(loginSuccess(data))
  }, error => {
    dispatch(loginFailure(error.message))
  })
}

export function logoutTrainer(dispatch) {
  localStorage.removeItem('id_token')
  localStorage.removeItem('trainer')
  
  dispatch(logoutSuccess())
}

export function fetchTrainers(dispatch) {
  makeApiRequest('/api/trainers', 'GET', null, true, data => {
    dispatch(trainerFetchSuccess(data))
  }, error => {
    dispatch(trainerFetchFailure(error.message))
  })
}

export function createTrainer(dispatch, trainerData) {
  makeApiRequest('/api/trainers', 'POST', trainerData, true, data => {
    dispatch(createTrainerSuccess(data))
  }, error => {
    dispatch(createTrainerFailure(error.message))
  })
}

export function deleteTrainer(dispatch, trainerId) {
  makeApiRequest('/api/traines/' + trainerId, 'DELETE', null, true, data => {
    dispatch(deleteTrainerSuccess(data))
  }, error => {
    dispatch(deleteTrainerFailure(error.message))
  })
}

export function ensureTrainer(dispatch, trainerId) {
  makeApiRequest('/api/trainers/' + trainerId + '/ensure', 'GET', null, false, data => {
    dispatch(ensureTrainerSuccess(data))
  }, error => {
    dispatch(ensureTrainerFailure(error.message))
  })
}

export function verifyTrainer(dispatch, trainerId, password) {
  const data = { password }
  makeApiRequest('/api/trainers/' + trainerId + '/verify', 'POST', data, false, data => {
    dispatch(verifyTrainerSuccess(data))
  }, error => {
    dispatch(verifyTrainerFailure(error.message))
  })
}
