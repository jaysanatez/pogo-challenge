export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

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
