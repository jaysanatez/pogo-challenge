import {
  loginUser,
  logoutUser,
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
  }
}
