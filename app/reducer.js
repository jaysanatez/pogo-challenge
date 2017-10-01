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

const defaultTrainerState = {
  trainer: JSON.parse(localStorage.getItem('trainer')),
}

function trainerReducer(state = defaultTrainerState, action) {
  if (action.type == LOGOUT)
    return defaultTrainerState

  if (trainerActions.indexOf(action.type) == -1)
    return state

  var trainer = action.trainer || state.trainer
  var message = action.message

  return {
    ...state,
    trainer,
    message,
  }
}

const defaultDashboardState = {
  trainers: [],
  catches: null,
  mapScope: MapScopes.USA,
  userScope: UserScopes.ME,
}

function dashboardReducer(state = defaultDashboardState, action) {
  if (action.type == LOGOUT)
    return defaultDashboardState

  if (dashboardActions.indexOf(action.type) == -1)
    return state

  var trainers = action.trainers || state.trainers
  var catches = action.catches || state.catches
  var mapScope = state.mapScope
  var userScope = state.userScope
  var message = action.message

  if (action.type == CREATE_TRAINER && action.trainer)
    trainers = trainers.concat(action.trainer)

  if (action.type == DELETE_TRAINER && action.trainerId)
    trainers = trainers.filter(tr => {
      return tr._id != action.trainerId
    })

  if (action.type == CREATE_CATCH && action.catch)
    catches = catches.concat(action.catch)

  if (action.type == SET_MAP_SCOPE && action.scope)
    mapScope = action.scope

  if (action.type == SET_USER_SCOPE && action.scope)
    userScope = action.scope

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
