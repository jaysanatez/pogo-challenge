import { combineReducers } from 'redux'
import {
  MapScopes,
  UserScopes,
  PokedexDisplays,
  PokedexPages,
} from './displayOptions'

import {
  SET_STATUS,
  SET_MAP_SCOPE,
  SET_USER_SCOPE,
  SET_POKEDEX_DISPLAY,
  SET_POKEDEX_PAGE,
  LOGIN,
  LOGOUT,
  UPDATE_TRAINERS,
  CREATE_TRAINER,
  DELETE_TRAINER,
  UPDATE_TRAINER,
} from './actions'

const trainerActions = [LOGIN, LOGOUT, SET_STATUS, UPDATE_TRAINER]
const dashboardActions = [UPDATE_TRAINERS, CREATE_TRAINER, DELETE_TRAINER, SET_MAP_SCOPE, SET_USER_SCOPE]
const pokedexActions = [SET_POKEDEX_DISPLAY, SET_POKEDEX_PAGE]

const defaultState = {
  trainer: JSON.parse(localStorage.getItem('trainer')),
  trainers: [],
  mapScope: MapScopes.USA,
  userScope: UserScopes.ME,
  pokedexDisplay: PokedexDisplays.COLLAPSED,
  pokedexPage: PokedexPages.GENERATION_3,
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

  if (action.type == SET_MAP_SCOPE && action.scope)
    mapScope = action.scope

  if (action.type == SET_USER_SCOPE && action.scope)
    userScope = action.scope

  return {
    ...state,
    trainers,
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

  const pokedexDisplay = action.display || state.pokedexDisplay
  const pokedexPage = action.page || state.pokedexPage

  return {
    ...state,
    pokedexDisplay,
    pokedexPage,
  }
}

export default combineReducers({
  trainerReducer,
  dashboardReducer,
  pokedexReducer,
})
