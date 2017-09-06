import {
  loginUser,
  logoutUser,
  fetchTrainers,
  createTrainer,
  deleteTrainer,
} from '../api/'

export const mapStateToProps = state => {
  const { authReducer, trainerReducer } = state
  const { user, message } = authReducer
  const { trainers } = trainerReducer

  return {
    user,
    message,
    trainers,
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onLoginClick: creds => {
      loginUser(dispatch, creds)
    },
    onLogoutClick: () => {
      logoutUser(dispatch)
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
  }
}
