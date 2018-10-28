// Load Data (paged)
// Save Data (new)
// Save Data (existing)
// Delete Data 

  const actions = {
    LOAD_DATA: "LOAD_DATA",
    SAVE_DATA: "SAVE_DATA",
    UPDATE_DATA: "UPDATE_DATA",
    DELETE_DATA: "DELETE_DATA",
    loadData: (config, pageStart, total) => {
        return {
            type: actions.DELETE_DATA,
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
  