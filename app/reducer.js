import { combineReducers } from 'redux'
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  TRAINER_FETCH_SUCCESS,
  TRAINER_FETCH_FAILURE,
  CREATE_TRAINER_SUCCESS,
  CREATE_TRAINER_FAILURE,
  DELETE_TRAINER_SUCCESS,
  DELETE_TRAINER_FAILURE,
  ENSURE_TRAINER_SUCCESS,
  ENSURE_TRAINER_FAILURE,
  VERIFY_TRAINER_SUCCESS,
  VERIFY_TRAINER_FAILURE,
} from './actions'

const authActions = [ LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS ]
const trainerActions = [ TRAINER_FETCH_SUCCESS, TRAINER_FETCH_FAILURE, CREATE_TRAINER_SUCCESS, CREATE_TRAINER_FAILURE, DELETE_TRAINER_SUCCESS, 
  DELETE_TRAINER_FAILURE, ENSURE_TRAINER_SUCCESS, ENSURE_TRAINER_FAILURE, VERIFY_TRAINER_SUCCESS, VERIFY_TRAINER_FAILURE ]

function authReducer(state = {
  trainer: JSON.parse(localStorage.getItem('trainer')),
}, action) {
  if (authActions.indexOf(action.type) == -1) {
    return state
  }

  var trainer = action.trainer || state.trainer
  var message = action.message || state.message

  if (action.type == LOGOUT_SUCCESS) { // clear state
    trainer = null
    message = null
  }

  return {
    ...state,
    trainer,
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

  if (action.type == DELETE_TRAINER_SUCCESS) {
    trainers = trainers.filter(tr => {
      return tr._id != action.trainerId
    })
  }

  var ensureResult
  if (action.type == ENSURE_TRAINER_SUCCESS || action.type == ENSURE_TRAINER_FAILURE) {
    ensureResult = {
      trainer: action.trainer,
      message: action.message,
    }
  }

  var verifyResult
  if (action.type == VERIFY_TRAINER_SUCCESS || action.type == VERIFY_TRAINER_FAILURE) {
    verifyResult = {
      trainer: action.trainer,
      message: action.message,
    }
  }

  return {
    ...state,
    trainers,
    ensureResult,
    verifyResult,
  }
}

export default combineReducers({
  authReducer,
  trainerReducer,
})
