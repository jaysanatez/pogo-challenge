import { combineReducers } from 'redux'
import { MapScopes, UserScopes } from './displayOptions'
import {
  LOGIN,
  LOGOUT,
  SET_STATUS,
  SET_MAP_SCOPE,
  SET_USER_SCOPE,
  FETCH_TRAINERS,
  CREATE_TRAINER,
  DELETE_TRAINER,
  FETCH_TRAINER,
  VERIFY_TRAINER,
  UPDATE_TRAINER,
  CREATE_CATCH,
  FETCH_CATCHES,
} from './actions'

const trainerActions = [LOGIN, LOGOUT, SET_STATUS, FETCH_TRAINER, VERIFY_TRAINER, UPDATE_TRAINER]
const dashboardActions = [FETCH_TRAINERS, CREATE_TRAINER, DELETE_TRAINER, CREATE_CATCH, FETCH_CATCHES, SET_MAP_SCOPE, SET_USER_SCOPE]

function trainerReducer(state = {
  trainer: JSON.parse(localStorage.getItem('trainer')),
}, action) {
  if (trainerActions.indexOf(action.type) == -1)
    return state

  var trainer = action.trainer || state.trainer
  var message = action.message

  if (action.type == LOGOUT) {
    trainer = null
  }

  return {
    ...state,
    trainer,
    message,
  }
}

function dashboardReducer(state = {
  trainers: [],
  catches: null,
  mapScope: MapScopes.USA,
  userScope: UserScopes.ME,
}, action) {
  if (dashboardActions.indexOf(action.type) == -1)
    return state

  var trainers = action.trainers || state.trainers
  var catches = action.catches || state.catches
  var mapScope = action.scope ||  state.mapScope
  var userScope = action.scope || state.userScope
  var message = action.message

  if (action.type == CREATE_TRAINER && action.trainer) {
    trainers = trainers.concat(action.trainer)
  }

  if (action.type == DELETE_TRAINER && action.trainerId) {
    trainers = trainers.filter(tr => {
      return tr._id != action.trainerId
    })
  }

  if (action.type == CREATE_CATCH && action.catch) {
    catches = catches.concat(action.catch)
  }

  return {
    ...state,
    trainers,
    catches,
    mapScope,
    userScope,
    message,
  }
}

export default combineReducers({
  trainerReducer,
  dashboardReducer,
})
