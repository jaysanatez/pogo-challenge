import { combineReducers } from 'redux'
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  TRAINER_FETCH_SUCCESS,
  TRAINER_FETCH_FAILURE,
  CREATE_TRAINER_SUCCESS,
  CREATE_TRAINER_FAILURE,
} from './actions'

const authActions = [ LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS ]
const trainerActions = [ TRAINER_FETCH_SUCCESS, TRAINER_FETCH_FAILURE, CREATE_TRAINER_SUCCESS, CREATE_TRAINER_FAILURE ]

function authReducer(state = {
  user: JSON.parse(localStorage.getItem('user')),
}, action) {
  if (authActions.indexOf(action.type) == -1) {
    return state
  }

  var user = action.user || state.user
  var message = action.message || state.message

  if (action.type == LOGOUT_SUCCESS) { // clear state
    user = null
    message = null
  }

  return {
    ...state,
    user,
    message,
  }
}

function trainerReducer(state = {
  trainers: [],
}, action) {
  if (trainerActions.indexOf(action.type) == -1) {
    return state
  }

  var trainers = action.trainers || state.trainers
  if (action.type == CREATE_TRAINER_SUCCESS) {
    trainers = trainers.concat(action.trainer)
  }

  return {
    ...state,
    trainers,
  }
}

export default combineReducers({
  authReducer,
  trainerReducer,
})
