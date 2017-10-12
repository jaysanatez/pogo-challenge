import {
  setStatus,
  setMapScope,
  setUserScope,
  setPokedexDisplay,
  setPokedexPage,
} from '../app/actions'

import {
  loginTrainer,
  logoutTrainer,
  fetchTrainers,
  createTrainer,
  deleteTrainer,
  fetchTrainer,
  fetchCurrentTrainer,
  verifyTrainer,
  updateXp,
  createCatch,
  fetchCatches,
  onAddPokedex,
} from '../api/'

function consolidateMessageFromReducers(reducers) {
  var message = null
  reducers.forEach(r => {
    message = message || r.message
  })

  return message
}

export const mapStateToProps = state => {
  const { trainerReducer, dashboardReducer, pokedexReducer } = state
  const { trainer } = trainerReducer
  const { trainers, catches, mapScope, userScope } = dashboardReducer
  const { pokedexDisplay, pokedexPage } = pokedexReducer

  const message = consolidateMessageFromReducers([
    trainerReducer,
    dashboardReducer,
  ])

  return {
    trainer,
    message,
    trainers,
    catches,
    mapScope,
    userScope,
    pokedexDisplay,
    pokedexPage,
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onLoginClick: creds => {
      loginTrainer(dispatch, creds)
    },
    onLogoutClick: () => {
      logoutTrainer(dispatch)
    },
    fetchTrainers: () => {
      fetchTrainers(dispatch)
    },
    onTrainerCreate: data => {
      createTrainer(dispatch, data)
    },
    onTrainerDelete: trainerId => {
      deleteTrainer(dispatch, trainerId)
    },
    fetchTrainer: trainerId => {
      fetchTrainer(dispatch, trainerId)
    },
    fetchCurrentTrainer: () => {
      fetchCurrentTrainer(dispatch)
    },
    verifyTrainer: (trainerId, password) => {
      verifyTrainer(dispatch, trainerId, password)
    },
    setStatus: message => {
      dispatch(setStatus(message))
    },
    onXPUpdate: xpUpdate => {
      updateXp(dispatch, xpUpdate)
    },
    onCatchCreate: data => {
      createCatch(dispatch, data)
    },
    fetchCatches: () => {
      fetchCatches(dispatch)
    },
    onAddPokedex: data => {
      onAddPokedex(dispatch, data)
    },
    setMapScope: scope => {
      dispatch(setMapScope(scope))
    },
    setUserScope: scope => {
      dispatch(setUserScope(scope))
    },
    setPokedexDisplay: display => {
      dispatch(setPokedexDisplay(display))
    },
    setPokedexPage: page => {
      dispatch(setPokedexPage(page))
    }
  }
}
