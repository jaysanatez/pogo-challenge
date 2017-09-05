import {
  loginUser,
  logoutUser,
  fetchTrainers,
} from '../api/'

export const mapStateToProps = state => {
  const { authentication } = state
  const { user, message } = authentication

  return {
    user,
    message,
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
  }
}
