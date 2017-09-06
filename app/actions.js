export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const TRAINER_FETCH_SUCCESS = 'TRAINER_FETCH_SUCCESS'
export const TRAINER_FETCH_FAILURE = 'TRAINER_FETCH_FAILURE'
export const CREATE_TRAINER_SUCCESS = 'CREATE_TRAINER_SUCCESS'
export const CREATE_TRAINER_FAILURE = 'CREATE_TRAINER_FAILURE'
export const DELETE_TRAINER_SUCCESS = 'DELETE_TRAINER_SUCCESS'
export const DELETE_TRAINER_FAILURE = 'DELETE_TRAINER_FAILURE'
export const ENSURE_TRAINER_SUCCESS = 'ENSURE_TRAINER_SUCCESS'
export const ENSURE_TRAINER_FAILURE = 'ENSURE_TRAINER_FAILURE'
export const VERIFY_TRAINER_SUCCESS = 'VERIFY_TRAINER_SUCCESS'
export const VERIFY_TRAINER_FAILURE = 'VERIFY_TRAINER_FAILURE'

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    trainer: data.trainer,
  }
}

export function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    message,
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export function trainerFetchSuccess(data) {
  return {
    type: TRAINER_FETCH_SUCCESS,
    trainers: data.trainers,
  }
}

export function trainerFetchFailure(message) {
  return {
    type: TRAINER_FETCH_FAILURE,
    message,
  }
}

export function createTrainerSuccess(data) {
  return {
    type: CREATE_TRAINER_SUCCESS,
    trainer: data.trainer,
  }
}

export function createTrainerFailure(message) {
  return {
    type: CREATE_TRAINER_FAILURE,
    message,
  }
}

export function deleteTrainerSuccess(data) {
  return {
    type: DELETE_TRAINER_SUCCESS,
    trainerId: data.trainerId,
  }
}

export function deleteTrainerFailure(message) {
  return {
    type: DELETE_TRAINER_FAILURE,
    message,
  }
}

export function ensureTrainerSuccess(data) {
  return {
    type: ENSURE_TRAINER_SUCCESS,
    trainer: data.trainer,
  }
}

export function ensureTrainerFailure(message) {
  return {
    type: ENSURE_TRAINER_FAILURE,
    message,
  }
}

export function verifyTrainerSuccess(data) {
  return {
    type: VERIFY_TRAINER_SUCCESS,
    trainer: data.trainer,
  }
}

export function verifyTrainerFailure(message) {
  return {
    type: VERIFY_TRAINER_FAILURE,
    message,
  }
}
