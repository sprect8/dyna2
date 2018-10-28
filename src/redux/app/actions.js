export function getView(width) {
  let newView = "MobileView";
  if (width > 1100) {
    newView = "DesktopView";
  } else if (width > 991) {
    newView = "TabLandView";
  } else if (width > 767) {
    newView = "TabView";
  }
  return newView;
}
const actions = {
  COLLPSE_CHANGE: "COLLPSE_CHANGE",
  CHANGE_OPEN_KEYS: "CHANGE_OPEN_KEYS",
  TOGGLE_ALL: "TOGGLE_ALL",
  CHANGE_CURRENT: "CHANGE_CURRENT",
  TOGLLE_SHOW_BREADCRUMB: "TOGLLE_SHOW_BREADCRUMB",
  TOGLLE_FIXED_NAVBAR: "TOGLLE_FIXED_NAVBAR",
  CHANGE_BRED_HEIGHT: "CHANGE_BRED_HEIGHT",
  LOAD_CONFIG_INPUT: "LOAD_CONFIG_INPUT",
  LOAD_CONFIG_INPUT_SAGA: "LOAD_CONFIG_INPUT_SAGA",
  LOAD_CONFIG_REPORTS: "LOAD_CONFIG_REPORTS",
  LOAD_CONFIG_REPORTS_SAGA: "LOAD_CONFIG_REPORTS_SAGA",
  LOAD_CONFIG_SIDEBAR: "LOAD_CONFIG_SIDEBAR",
  LOAD_CONFIG_SIDEBAR_SAGA: "LOAD_CONFIG_SIDEBAR_SAGA",
  LOAD_CONFIG_NAV: "LOAD_CONFIG_NAV",
  LOAD_CONFIG_NAV_SAGA: "LOAD_CONFIG_NAV_SAGA",
  
  loadConfigInput: () => ({
    type: actions.LOAD_CONFIG_INPUT_SAGA
  }),
  loadConfigSidebar: () => ({
    type: actions.LOAD_CONFIG_SIDEBAR_SAGA
  }),
  loadConfigReports: () => ({
    type: actions.LOAD_CONFIG_REPORTS_SAGA
  }),
  toggleCollapsed: () => ({
    type: actions.COLLPSE_CHANGE
  }),
  toggleAll: (width, height) => {
    const view = getView(width);
    const collapsed = view !== "DesktopView";
    return {
      type: actions.TOGGLE_ALL,
      collapsed,
      view,
      height
    };
  },
  changeOpenKeys: openKeys => ({
    type: actions.CHANGE_OPEN_KEYS,
    openKeys
  }),
  changeCurrent: current => ({
    type: actions.CHANGE_CURRENT,
    current
  }),
  toggleShowBreadCrumb: () => ({ type: actions.TOGLLE_SHOW_BREADCRUMB }),
  toggleFixedNavbar: () => ({ type: actions.TOGLLE_FIXED_NAVBAR }),
  changeBredHeight: bredHeight => ({
    type: actions.CHANGE_BRED_HEIGHT,
    bredHeight
  })
};
export default actions;
