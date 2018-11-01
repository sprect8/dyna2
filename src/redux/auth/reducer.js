import actions from "./actions";

const initState = { idToken: null };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.token
      };
    case actions.REGISTER_REQUEST:
      return {
        success: action.result.success,
        message: action.result.message,
      }
    case actions.REGISTER_ERROR:
      return {
        success: false,
        message: action.error,
      }
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
