import actions from "./actions";

const initState = { rows: null };

export default function masterDetailsReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOAD_DATA:
      return {
        ...state,
        rows: action.payload
      };
    case actions.ACTION_SUCCESS:
      return {
        ...state,
        success: true,
        action: action.name
      };
    case actions.DATA_ERROR:
      return {
        ...state,
        success: false,
        message: action.message,
      }
    case actions.DELETE_FAILED:
      return {
        ...state,
        success: false,
        message: action.message,
      }
    case actions.DELETE_SUCCESS:
      return {
        ...state,
        success: true,
        deleted: true,        
      }
    default:
      return state;
  }
}
