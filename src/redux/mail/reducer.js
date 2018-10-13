import clone from 'clone';
import allMails, { currentUser } from '../../containers/Mail/fakeData';
import actions from './actions';

const initState = {
  allMails,
  currentUser,
  tag: undefined,
  selectedMail: -1,
  filterAttr: { bucket: 'Inbox' },
  composeMail: false,
  replyMail: false,
  activeAddress: false,
  openDrawer: false,
  mobileSearchView: false,
  searchString: '',
  checkedMails: {}
};

export default function mailReducer(state = initState, action) {
  switch (action.type) {
    case actions.FILTER_ATTRIBUTE:
      return {
        ...state,
        filterAttr: { ...action.filterAttr },
        selectedMail: -1,
        composeMail: false,
        activeAddress: false,
        replyMail: false,
        openDrawer: false
      };
    case actions.SELECTED_MAIL:
      return {
        ...state,
        selectedMail: action.selectedMail,
        allMails: action.allMails,
        activeAddress: false,
        replyMail: false,
        openDrawer: false,
        mobileSearchView: false
      };
    case actions.COMPOSE_MAIL:
      return {
        ...state,
        composeMail: action.composeMail,
        activeAddress: false,
        replyMail: false,
        openDrawer: false
      };
    case actions.REPLY_MAIL:
      return {
        ...state,
        replyMail: action.replyMail,
        mobileSearchView: false
      };

    case actions.SEARCH_STRING:
      return { ...state, searchString: action.searchString };
    case actions.UPDATE_CHECKED_MAIL:
      return {
        ...state,
        checkedMails: clone(action.checkedMails),
        mobileSearchView: false
      };

    case actions.BULK_ACTIONS:
      return {
        ...state,
        checkedMails: {},
        selectedMail: -1,
        mobileSearchView: false
      };

    case actions.TOGGLE_ADDRESS:
      return { ...state, activeAddress: !state.activeAddress };
    case actions.TOGGLE_DRAWER:
      return { ...state, openDrawer: action.openDrawer };
    case actions.TOGGLE_SEARCH:
      return { ...state, mobileSearchView: !state.mobileSearchView };
    default:
      return state;
  }
}
