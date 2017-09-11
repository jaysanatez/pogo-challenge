import { setStatus } from '../app/actions'
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
} from '../api/'

export const mapStateToProps = state => {
  const { trainerReducer, dashboardReducer } = state
  const { trainer, message } = trainerReducer
  const { trainers } = dashboardReducer

  return {
    trainer,
    message,
    trainers,
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
  }
}
