const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT_SAGA: 'LOGOUT_SAGA',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS', 
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGIN_ERROR: 'LOGIN_ERROR',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGiSTER_REQUEST_SAGA: 'REGISTER_REQUEST_SAGA',
  REGISTER_ERROR: 'REGISTER_ERROR',
  RESETPASS: "RESET_PASSWORD",
  RESETPASS_SAGA: "RESET_PASSWORD_SAGA",
  resetPassword: payload => ({
    type: actions.RESETPASS_SAGA,
    payload
  }),
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: payload => ({
    type: actions.LOGIN_REQUEST,
    payload
  }),
  logout: payload => ({
    type: actions.LOGOUT_SAGA
  }),
  register: payload=> ({
    type: actions.REGiSTER_REQUEST_SAGA,
    payload
  }),
  registerError: error=> ({
    type: actions.REGISTER_ERROR,
    error
  })
};
export default actions;
