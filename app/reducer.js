import { combineReducers } from 'redux'
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './actions'

const authActions = [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS ]

function authentication(state = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
}, action) {

  if (authActions.indexOf(action.type) == -1) {
    return state
  }

  let newState = {
  	...state,
  	isFetching: action.type == LOGIN_REQUEST,
  	isAuthenticated: action.type == LOGIN_SUCCESS,
  	user: action.user || state.user
  }

  return newState
}

export default combineReducers({
  authentication,
})