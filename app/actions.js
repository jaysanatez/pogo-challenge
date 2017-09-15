export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_STATUS = 'SET_STATUS'

export const FETCH_TRAINERS = 'FETCH_TRAINERS'
export const CREATE_TRAINER = 'CREATE_TRAINER'
export const DELETE_TRAINER = 'DELETE_TRAINER'
export const FETCH_TRAINER = 'FETCH_TRAINER'
export const VERIFY_TRAINER = 'VERIFY_TRAINER'
export const UPDATE_TRAINER = 'UPDATE_TRAINER'

export const CREATE_CATCH = 'CREATE_CATCH'
export const FETCH_CATCHES = 'FETCH_CATCHES'

export function setStatus(message) {
  return {
    type: SET_STATUS,
    message,
  }
}

export function loginResponse(data) {
  return {
    type: LOGIN,
    ...data,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function fetchTrainersResponse(data) {
  return {
    type: FETCH_TRAINERS,
    ...data,
  }
}

export function createTrainerResponse(data) {
  return {
    type: CREATE_TRAINER,
    ...data,
  }
}

export function deleteTrainerResponse(data) {
  return {
    type: DELETE_TRAINER,
    ...data,
  }
}

export function fetchTrainerResponse(data) {
  return {
    type: FETCH_TRAINER,
    ...data,
  }
}

export function verifyTrainerResponse(data) {
  return {
    type: VERIFY_TRAINER,
    ...data,
  }
}

export function updateTrainerResponse(data) {
  return {
    type: UPDATE_TRAINER,
    ...data,
  }
}

export function createCatchReponse(data) {
  return {
    type: CREATE_CATCH,
    ...data,
  }
}

export function fetchCatchesResponse(data) {
  return {
    type: FETCH_CATCHES,
    ...data,
  }
}
