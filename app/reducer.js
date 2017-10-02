import { combineReducers } from 'redux'
import { MapScopes, UserScopes, PokedexPages } from './displayOptions'
import {
  LOGIN,
  LOGOUT,
  SET_STATUS,
  SET_MAP_SCOPE,
  SET_USER_SCOPE,
  SET_POKEDEX_PAGE,
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
const pokedexActions = [SET_POKEDEX_PAGE]

const defaultState = {
  trainer: JSON.parse(localStorage.getItem('trainer')),
  trainers: [],
  catches: null,
  mapScope: MapScopes.USA,
  userScope: UserScopes.ME,
  pokedexPage: PokedexPages.LEGENDARY,
}

function trainerReducer(state = defaultState, action) {
  if (action.type == LOGOUT) {
    return {
      ...defaultState,
      trainer: null,
    }
  }

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

function dashboardReducer(state = defaultState, action) {
  if (action.type == LOGOUT)
    return defaultState

  if (dashboardActions.indexOf(action.type) == -1)
    return state

  var trainers = action.trainers || state.trainers
  var catches = action.catches || state.catches
  var mapScope = state.mapScope
  var userScope = state.userScope
  var message = action.message

  if (action.type == CREATE_TRAINER && action.trainer)
    trainers = trainers.concat(action.trainer)

  if (action.type == DELETE_TRAINER && action.trainerId) {
    trainers = trainers.filter(tr => {
      return tr._id != action.trainerId
    })
  }

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

function pokedexReducer(state = defaultState, action) {
  if (action.type == LOGOUT)
    return defaultState

  if (pokedexActions.indexOf(action.type) == -1)
    return state

  const pokedexPage = action.page || state.pokedexPage
  return {
    ...state,
    pokedexPage,
  }
}

export default combineReducers({
  trainerReducer,
  dashboardReducer,
  pokedexReducer,
})
