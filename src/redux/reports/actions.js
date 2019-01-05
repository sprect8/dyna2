// Load Data (paged)
// Save Data (new)
// Save Data (existing)
// Delete Data 

const actions = {
      
    LOAD_REPORT_SAGA: "LOAD_REPORT_SAGA",
    LOAD_REPORT: "LOAD_REPORT",
    DATA_ERROR: "DATA_ERROR",

    loadReport: (report) => {
        return {
            type: actions.LOAD_REPORT_SAGA,
            report: report
        }
    }
  };
  export default actions;
  