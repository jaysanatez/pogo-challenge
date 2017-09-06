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
} from '../app/actions'

export function loginUser(dispatch, creds) {
  // call api then dispatch success or failure
  makeApiRequest('/api/login', 'POST', creds, false, data => {
    localStorage.setItem('id_token', data.token)
    localStorage.setItem('user', JSON.stringify(data.trainer))

    dispatch(loginSuccess(data))
  }, error => {
    dispatch(loginFailure(error.message))
  })
}

export function logoutUser(dispatch) {
  localStorage.removeItem('id_token')
  localStorage.removeItem('user')
  
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
  makeApiRequest('/api/trainer', 'POST', trainerData, true, data => {
    dispatch(createTrainerSuccess(data))
  }, error => {
    dispatch(createTrainerFailure(error.message))
  })
}

export function deleteTrainer(dispatch, trainerId) {
  makeApiRequest('/api/trainer/' + trainerId, 'DELETE', null, true, data => {
    dispatch(deleteTrainerSuccess(data))
  }, error => {
    dispatch(deleteTrainerFailure(error.message))
  })
}
