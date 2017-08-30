import { combineReducers } from 'redux'
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './actions'

const authActions = [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS ]

function authentication(state = {
  user: JSON.parse(localStorage.getItem('user')),
}, action) {
  if (authActions.indexOf(action.type) == -1) {
    return state
  }

  let user = action.user || state.user
  if (action.type == LOGOUT_SUCCESS) { // clear user from state
    user = null
  }

  let newState = {
  	...state,
  	user,
  }

  return newState
}

export default combineReducers({
  authentication,
})