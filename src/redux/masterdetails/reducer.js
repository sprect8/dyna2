import actions from "./actions";

const initState = { rows: null };

export default function masterDetailsReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOAD_DATA:
      return {
        ...state,
        loaded: false,
        rows: action.payload,
        selectedData: null,
      };
    case actions.FORM_MODIFIED:
      return {
        ...state,
        loaded: false,
        success: false,
        action: action.name,
      }
    case actions.ACTION_SUCCESS:
      return {
        ...state,
        loaded: false,
        success: true,
        action: action.name,
        selectedData: null,
      };
    case actions.DATA_ERROR:
      return {
        ...state,
        loaded: false,
        success: false,
        message: action.message,
        selectedData: null,
      }
    case actions.DELETE_FAILED:
      return {
        ...state,
        loaded: false,
        success: false,
        message: action.message,
        selectedData: null,
      }
    case actions.LOAD_USER_SETTINGS_SAGA: 
      return {
        ...state,
        loaded: false,
        success: false,
        message: null,
      }
    case actions.LOAD_USER_SETTINGS:
      return {
        ...state,
        profile: action.payload
      }    
    case actions.SAVE_COMPANY_SETTINGS:
      state.profile.settings = action.payload;
      return {
        ...state,
        success: true,
        message: action.message,
      }
    case actions.SAVE_USER_SETTINGS:
      state.profile.user = action.payload;

      return {
        ...state,
        success: true,
        profile: state.profile        
      }
    case actions.DELETE_SUCCESS:
      return {
        ...state,
        loaded: false,
        success: true,
        deleted: true,
        selectedData: null,
      }
    case actions.CREATE_DATA:
      return {
        success: false,
        deleted: false,
        rows: state.rows,
        message: "",
        loaded: true,
        selectedData: action.loaded
      }
    case actions.EDIT_DATA:
      return {
        success: false,
        deleted: false,
        rows: state.rows,
        message: "",
        loaded: true,
        selectedData: action.loaded
      }
    case actions.CLOSED_EDIT:
      return {
        success: false,
        deleted: false,
        rows: state.rows,
        message: "",
        loaded: false,
        selectedData: null
      }
    default:
      return state;
  }
}
