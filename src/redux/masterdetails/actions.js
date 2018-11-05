// Load Data (paged)
// Save Data (new)
// Save Data (existing)
// Delete Data 

  const actions = {
      
    LOAD_DATA_SAGA: "LOAD_DATA_SAGA",
    ACTION_SUCCESS: "ACTION_SUCCESS", // on success of actions
    LOAD_DATA: "LOAD_DATA",
    SAVE_DATA: "SAVE_DATA",
    UPDATE_DATA: "UPDATE_DATA",
    DELETE_DATA: "DELETE_DATA",
    DATA_ERROR: "DATA_ERROR", 
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
  