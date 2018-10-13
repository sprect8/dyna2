const actions = {
  FILTER_ATTRIBUTE: 'FILTER_ATTRIBUTE',
  SELECTED_MAIL: 'SELECTED_MAIL',
  COMPOSE_MAIL: 'COMPOSE_MAIL',
  REPLY_MAIL: 'REPLY_MAIL',
  SEARCH_STRING: 'SEARCH_STRING',
  BULK_ACTIONS: 'BULK_ACTIONS',
  UPDATE_CHECKED_MAIL: 'UPDATE_CHECKED_MAIL',
  TOGGLE_ADDRESS: 'TOGGLE_ADDRESS',
  TOGGLE_DRAWER: 'TOGGLE_DRAWER',
  TOGGLE_SEARCH: 'TOGGLE_SEARCH',
  filterAction: newFilterAttr => {
    return (dispatch, getState) => {
      const filterAttr = getState().Mails.filterAttr;
      if (newFilterAttr) {
        if (newFilterAttr.bucket) {
          filterAttr.bucket = newFilterAttr.bucket;
          filterAttr.tag = newFilterAttr.tag;
        } else if (newFilterAttr.tag) {
          filterAttr.tag = newFilterAttr.tag;
        }
      }
      dispatch({
        type: actions.FILTER_ATTRIBUTE,
        filterAttr
      });
    };
  },
  selectMail: selectedMail => {
    return (dispatch, getState) => {
      const allMails = getState().Mails.allMails;
      if (selectedMail) {
        allMails[
          allMails.findIndex(mail => mail.id === selectedMail)
        ].read = true;
      }
      dispatch({
        type: actions.SELECTED_MAIL,
        selectedMail,
        allMails
      });
    };
  },
  changeComposeMail: composeMail => ({
    type: actions.COMPOSE_MAIL,
    composeMail
  }),
  changeReplyMail: replyMail => ({
    type: actions.REPLY_MAIL,
    replyMail
  }),
  changeSearchString: searchString => ({
    type: actions.SEARCH_STRING,
    searchString
  }),
  updateCheckedMail: checkedMails => ({
    type: actions.UPDATE_CHECKED_MAIL,
    checkedMails
  }),
  bulkActions: payload => ({
    type: actions.BULK_ACTIONS,
    payload
  }),
  toggleAddress: () => ({
    type: actions.TOGGLE_ADDRESS
  }),
  toggleOpenDrawer: openDrawer => ({
    type: actions.TOGGLE_DRAWER,
    openDrawer
  }),
  toggleSearch: () => ({ type: actions.TOGGLE_SEARCH })
};
export default actions;
