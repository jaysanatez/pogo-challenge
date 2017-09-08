import makeApiRequest from './makeApiRequest'
import {
  loginResponse,
  logout,
  fetchTrainersResponse,
  createTrainerResponse,
  deleteTrainerResponse,
  fetchTrainerResponse,
  verifyTrainerResponse,
} from '../app/actions'

const handleUserAuth = (dispatch, data, resp) => {
  const trainer = data.trainer
  const token = data.token

  if (!trainer) {
    dispatch(resp({ message: 'Error! Server returned no trainer.' }))
    return
  }

  localStorage.setItem('id_token', token)
  localStorage.setItem('trainer', JSON.stringify(trainer))

  dispatch(resp({ trainer }))
}

export function loginTrainer(dispatch, creds) {
  makeApiRequest('/api/login', 'POST', creds, false, data => {
    handleUserAuth(dispatch, data, loginResponse)
  }, error => {
    dispatch(loginResponse({ message: error.message }))
  })
}

export function logoutTrainer(dispatch) {
  localStorage.removeItem('id_token')
  localStorage.removeItem('trainer')
  
  dispatch(logout())
}

export function fetchTrainers(dispatch) {
  makeApiRequest('/api/trainers', 'GET', null, true, data => {
    dispatch(fetchTrainersResponse(data))
  }, () => {
    dispatch(fetchTrainersResponse())
  })
}

export function createTrainer(dispatch, trainerData) {
  makeApiRequest('/api/trainers', 'POST', trainerData, true, data => {
    dispatch(createTrainerResponse(data))
  }, () => {
    dispatch(createTrainerResponse())
  })
}

export function deleteTrainer(dispatch, trainerId) {
  makeApiRequest('/api/trainers/' + trainerId, 'DELETE', null, true, data => {
    dispatch(deleteTrainerResponse(data))
  }, () => {
    dispatch(deleteTrainerResponse())
  })
}

export function fetchTrainer(dispatch, trainerId) {
  makeApiRequest('/api/trainers/' + trainerId, 'GET', null, false, data => {
    dispatch(fetchTrainerResponse(data))
  }, () => {
    dispatch(fetchTrainerResponse())
  })
}

export function verifyTrainer(dispatch, trainerId, password) {
  const data = { password }
  makeApiRequest('/api/trainers/' + trainerId + '/verify', 'POST', data, false, data => {
    handleUserAuth(dispatch, data, verifyTrainerResponse)
  }, () => {
    dispatch(verifyTrainerResponse())
  })
}

// TODO: store the user in the state so it re-renders everything
export function updateXp(dispatch, xpUpdate) {
  makeApiRequest('/api/xp/update', 'POST', xpUpdate, true, data => {
    console.log(1)
  }, () => {
    console.log(2)
  })
}
