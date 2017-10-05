import makeApiRequest from './makeApiRequest'
import {
  LOGIN,
  LOGOUT,
  FETCH_TRAINER,
  FETCH_TRAINERS,
  CREATE_TRAINER,
  DELETE_TRAINER,
  CREATE_CATCH,
  FETCH_CATCHES,
  responseAction,
} from '../app/actions'

const handleUserAuth = (dispatch, data, key) => {
  const trainer = data.trainer
  const token = data.token

  if (!trainer) {
    dispatch(responseAction(key, { message: 'Error! Server returned no trainer.' }))
    return
  }

  const trainerLight = {
    ...trainer,
    xpUpdates: null,
    pokedex: null,
  }

  localStorage.setItem('id_token', token)
  localStorage.setItem('trainer', JSON.stringify(trainerLight))

  dispatch(responseAction(key, { trainer }))
}

export function loginTrainer(dispatch, creds) {
  makeApiRequest('/api/login', 'POST', creds, false, data => {
    handleUserAuth(dispatch, data, LOGIN)
  }, error => {
    dispatch(responseAction(LOGIN, error))
  })
}

export function logoutTrainer(dispatch) {
  localStorage.removeItem('id_token')
  localStorage.removeItem('trainer')
  
  dispatch(responseAction(LOGOUT))
}

export function fetchTrainers(dispatch) {
  makeApiRequest('/api/trainers', 'GET', null, true, data => {
    dispatch(responseAction(FETCH_TRAINERS, data))
  }, () => {
    dispatch(responseAction(FETCH_TRAINERS))
  })
}

export function createTrainer(dispatch, trainerData) {
  makeApiRequest('/api/trainers', 'POST', trainerData, true, data => {
    dispatch(responseAction(CREATE_TRAINER, data))
  }, () => {
    dispatch(responseAction(CREATE_TRAINER))
  })
}

export function deleteTrainer(dispatch, trainerId) {
  makeApiRequest('/api/trainers/' + trainerId, 'DELETE', null, true, data => {
    dispatch(responseAction(DELETE_TRAINER, data))
  }, () => {
    dispatch(responseAction(DELETE_TRAINER))
  })
}

export function fetchTrainer(dispatch, trainerId) {
  makeApiRequest('/api/trainers/' + trainerId, 'GET', null, false, data => {
    dispatch(responseAction(FETCH_TRAINER, data))
  }, () => {
    dispatch(responseAction(FETCH_TRAINER))
  })
}

export function fetchCurrentTrainer(dispatch) {
  makeApiRequest('api/trainers/current', 'GET', null, true, data => {
    dispatch(responseAction(FETCH_TRAINER, data))
  }, () => {
    dispatch(responseAction(FETCH_TRAINER))
  })
}

export function verifyTrainer(dispatch, trainerId, password) {
  const data = { password }
  makeApiRequest('/api/trainers/' + trainerId + '/verify', 'POST', data, false, data => {
    handleUserAuth(dispatch, data, LOGIN)
  }, () => {
    dispatch(responseAction(LOGIN))
  })
}

export function updateXp(dispatch, xpUpdate) {
  makeApiRequest('/api/xp/update', 'POST', xpUpdate, true, data => {
    dispatch(responseAction(FETCH_TRAINER, data))
  }, error => {
    dispatch(responseAction(FETCH_TRAINER, error))
  })
}

export function createCatch(dispatch, catchData) {
  makeApiRequest('/api/catches', 'POST', catchData, true, data => {
    dispatch(responseAction(CREATE_CATCH, data))
  }, error => {
    dispatch(responseAction(CREATE_CATCH, error))
  })
}

export function fetchCatches(dispatch) {
  makeApiRequest('/api/catches', 'GET', null, true, data => {
    dispatch(responseAction(FETCH_CATCHES, data))
  }, () => {
    dispatch(responseAction(FETCH_CATCHES))
  })
}

export function onAddPokedex(dispatch, pokedexData) {
  makeApiRequest('/api/trainers/pokedex', 'POST', pokedexData, true, data => {
    dispatch(responseAction(FETCH_TRAINER, data))
  }, () => {
    dispatch(responseAction(FETCH_TRAINER))
  })
}
