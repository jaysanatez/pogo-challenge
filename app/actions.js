export const SET_STATUS = 'SET_STATUS'
export const SET_MAP_SCOPE = 'SET_MAP_SCOPE'
export const SET_USER_SCOPE = 'SET_USER_SCOPE'
export const SET_POKEDEX_DISPLAY = 'SET_POKEDEX_DISPLAY'
export const SET_POKEDEX_PAGE = 'SET_POKEDEX_PAGE'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const FETCH_TRAINER = 'FETCH_TRAINER'
export const FETCH_TRAINERS = 'FETCH_TRAINERS'
export const CREATE_TRAINER = 'CREATE_TRAINER'
export const DELETE_TRAINER = 'DELETE_TRAINER'
export const CREATE_CATCH = 'CREATE_CATCH'

// direct state change

export function setStatus(message) {
  return {
    type: SET_STATUS,
    message,
  }
}

export function setMapScope(scope) {
  return {
    type: SET_MAP_SCOPE,
    scope,
  }
}

export function setUserScope(scope) {
  return {
    type: SET_USER_SCOPE,
    scope,
  }
}

export function setPokedexDisplay(display) {
  return {
    type: SET_POKEDEX_DISPLAY,
    display,
  }
}

export function setPokedexPage(page) {
  return {
    type: SET_POKEDEX_PAGE,
    page,
  }
}

// state change from api response

export function responseAction(type, data) {
  return {
    type,
    ...data,
  }
}
