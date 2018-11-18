// Load Data (paged)
// Save Data (new)
// Save Data (existing)
// Delete Data 

  const actions = {
      
    LOAD_DATA_SAGA: "LOAD_DATA_SAGA",
    ACTION_SUCCESS: "ACTION_SUCCESS", // on success of actions
    DELETE_SUCCESS: "DELETE_SUCCESS",
    DELETE_FAILED: "DELETE_FAILED",
    LOAD_DATA: "LOAD_DATA",
    SAVE_DATA: "SAVE_DATA",
    UPDATE_DATA: "UPDATE_DATA",
    DELETE_DATA: "DELETE_DATA",
    DATA_ERROR: "DATA_ERROR", 
    LOV_FETCH_SAGA: "LOV_FETCH_SAGA",
    LOV_FETCH:"LOV_FETCH",
    EDIT_DATA: "EDIT_DATA",
    CREATE_DATA: "CREATE_DATA",
    CLOSED_EDIT: "CLOSED_EDIT",
    FORM_MODIFIED: "FORM_MODIFIED",
    LOAD_USER_SETTINGS: "LOAD_USER_SETTINGS",
    LOAD_USER_SETTINGS_SAGA: "LOAD_USER_SETTINGS_SAGA",
    SAVE_USER_SETTINGS: "SAVE_USER_SETTINGS",
    SAVE_USER_SETTINGS_SAGA: "SAVE_USER_SETTINGS_SAGA",
    SAVE_COMPANY_SETTINGS: "SAVE_COMPANY_SETTINGS",
    SAVE_COMPANY_SETTINGS_SAGA: "SAVE_COMPANY_SETTINGS_SAGA",
    
    loadUserSettings: () => {
        return {
            type: actions.LOAD_USER_SETTINGS_SAGA
        }
    },
    saveUserSettings: (payload) => {
        return {
            type: actions.SAVE_USER_SETTINGS_SAGA,
            payload: payload
        }
    },
    saveCompanySettings:(payload) => {
        return {
            type: actions.SAVE_COMPANY_SETTINGS_SAGA,
            payload: payload
        }
    }, 
    formModified: () => {
        return {
            type: actions.FORM_MODIFIED
        }
    },
    closedEditBox: () => {
        return {
            type: actions.CLOSED_EDIT
        }
    },
    openToEdit: (data) => {
        return {
            type: actions.EDIT_DATA,
            loaded: data,
        }
    }, 
    openForNew: (data) => {
        return {
            type: actions.CREATE_DATA,
            loaded: data
        }
    },
    fetchLOV: (table, query) => {
        return {
            type: actions.LOV_FETCH_SAGA,
            table,
            query
        }
    },
    loadData: (config, pageStart, total) => {
        return {
            type: actions.LOAD_DATA_SAGA,
            config,
            pageStart,
            total
        }        
    },
    saveData: (config, row) => {
        return {
            type: actions.SAVE_DATA,
            row,
            config
        }
    },
    updateData: (config, row) => {
        return {
            type: actions.UPDATE_DATA,
            row,
            config
        }
    },
    deleteData: (config, uniqueId) => {
        return {
            type: actions.DELETE_DATA,
            config,
            uniqueId
        }
    }
  };
  export default actions;
  