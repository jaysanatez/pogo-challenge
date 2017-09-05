export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const TRAINER_FETCH_SUCCESS = 'TRAINER_FETCH_SUCCESS'
export const TRAINER_FETCH_FAILURE = 'TRAINER_FETCH_FAILURE'

export function loginRequest() {
  return {
	  type: LOGIN_REQUEST,
  }
}

export function loginSuccess(data) {
  return {
  	type: LOGIN_SUCCESS,
  	user: data.user,
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
    trainers: data.users,
  }
}

export function trainerFetchFailure(message) {
  return {
    type: trainerFetchFailure,
    message,
  }
}
