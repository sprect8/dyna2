import actions from "./actions";

const initState = { idToken: null };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.payload.token,
        name: action.name
      };
    case actions.LOGIN_FAILED:
      return {
        idToken: null
      };
    case actions.LOGIN_ERROR:
      return {
        loginError: action.message,
        idToken: null
      };
    case actions.REGISTER_REQUEST:
      return {
        success: action.result.success,
        message: action.result.message,
      }
    case actions.RESETPASS:
      return {
        success: action.result.success,
        message: action.result.message
      }
    case actions.REGISTER_ERROR:
      return {
        success: false,
        error: action.error,
      }
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
