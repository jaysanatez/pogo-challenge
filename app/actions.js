export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const FETCH_TRAINERS = 'FETCH_TRAINERS'
export const CREATE_TRAINER = 'CREATE_TRAINER'
export const DELETE_TRAINER = 'DELETE_TRAINER'
export const FETCH_TRAINER = 'FETCH_TRAINER'
export const VERIFY_TRAINER = 'VERIFY_TRAINER'

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

export function setVerifyStatus(message) {
  return {
    type: VERIFY_TRAINER,
    message,
  }
}

export function verifyTrainerResponse(data) {
  return {
    type: VERIFY_TRAINER,
    ...data,
  }
}
