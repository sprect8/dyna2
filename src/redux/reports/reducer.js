import actions from "./actions";

const initState = { rows: null };

export default function masterDetailsReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOAD_REPORT:
      return {
        ...state,
        result: action.result,
      };
    case actions.DATA_ERROR:
      return {
          ...state,
          error: action.message
      }
    default:
      return state;
  }
}
