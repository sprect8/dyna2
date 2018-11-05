import actions from "./actions";

const initState = { rows: [] };

export default function masterDetailsReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOAD_DATA:
      return {
        rows: action.payload
      };
    case actions.ACTION_SUCCESS:
      return {
        success: true,
        action: action.name
      };
    case actions.DATA_ERROR:
      return {
        success: false,
        message: action.message,
      }
    default:
      return state;
  }
}
