import {
  loginUser,
  logoutUser,
  fetchTrainers,
} from '../api/'

export const mapStateToProps = state => {
  const { authentication } = state
  const { user, isAuthenticated, } = authentication

  return {
    user,
    isAuthenticated,
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
    onDashboardLoad: () => {
      fetchTrainers(dispatch)
    },
  }
}
