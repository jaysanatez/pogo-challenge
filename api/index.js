import makeApiRequest from './makeApiRequest'
import {
  loginResponse,
  logout,
  fetchTrainersResponse,
  createTrainerResponse,
  deleteTrainerResponse,
  fetchTrainerResponse,
  verifyTrainerResponse,
  updateTrainerResponse,
  createCatchReponse,
  fetchCatchesResponse,
} from '../app/actions'

const handleUserAuth = (dispatch, data, resp) => {
  const trainer = data.trainer
  const token = data.token

  if (!trainer) {
    dispatch(resp({ message: 'Error! Server returned no trainer.' }))
    return
  }

  const trainerLight = {
    ...trainer,
    xpUpdates: null,
    pokedex: null,
  }

  localStorage.setItem('id_token', token)
  localStorage.setItem('trainer', JSON.stringify(trainerLight))

  dispatch(resp({ trainer }))
}

export function loginTrainer(dispatch, creds) {
  makeApiRequest('/api/login', 'POST', creds, false, data => {
    handleUserAuth(dispatch, data, loginResponse)
  }, error => {
    dispatch(loginResponse(error))
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

export function fetchCurrentTrainer(dispatch) {
  makeApiRequest('api/trainers/current', 'GET', null, true, data => {
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

export function updateXp(dispatch, xpUpdate) {
  makeApiRequest('/api/xp/update', 'POST', xpUpdate, true, data => {
    dispatch(updateTrainerResponse(data))
  }, error => {
    dispatch(updateTrainerResponse(error))
  })
}

export function createCatch(dispatch, catchData) {
  makeApiRequest('/api/catches', 'POST', catchData, true, data => {
    dispatch(createCatchReponse(data))
  }, error => {
    dispatch(createCatchReponse(error))
  })
}

export function fetchCatches(dispatch) {
  makeApiRequest('/api/catches', 'GET', null, true, data => {
    dispatch(fetchCatchesResponse(data))
  }, () => {
    dispatch(fetchCatchesResponse())
  })
}

export function onAddPokedex(dispatch, pokemonId, date) {
  console.log(pokemonId, date)
}
