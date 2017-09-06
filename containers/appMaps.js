import {
  loginTrainer,
  logoutTrainer,
  fetchTrainers,
  createTrainer,
  deleteTrainer,
  ensureTrainer,
  verifyTrainer,
} from '../api/'

export const mapStateToProps = state => {
  const { authReducer, trainerReducer } = state
  const { trainer, message } = authReducer
  const { trainers, ensureResult, verifyResult } = trainerReducer

  return {
    trainer,
    message,
    trainers,
    ensureResult,
    verifyResult,
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
    ensureTrainer: trainerId => {
      ensureTrainer(dispatch, trainerId)
    },
    verifyTrainer: (trainerId, password) => {
      verifyTrainer(dispatch, trainerId, password)
    },
  }
}
