let config = (router)=>{
    router.get('/api/receipts-manage', function(req, res) {
        // we return receipts list
        // but we also return an array of items for each receipt
      })
      
      router.get('/tableProfiles', function (req, res) {
        // get the table configurations
      
        res.json(getConfiguration(true));
      });
      
      router.get('/sidebarConfig', function (req, res) {
        res.json(sidebarConfiguration());
      })
      
      router.get('/reportProfiles', function (req, res) {
        // get report profile which defines the report 
        res.json(getReportConfig());
      });
      
      const reportMapping = {
        //"business-improvement-page":
        //"business-waste-page":
        "platform-engagement-page":require("../../../queries/platformEngagement"),
        "customer-satisfaction-page":require("./queries/customerSatisfaction"),
        "inventory-optimisation-page":require("./queries/inventoryOptimisations"),
        "cost-efficiency":require("./queries/salesAnalysisQueries"),
        "business-improvement-page":require("./queries/businessProcessImprovement")
      
      }
      
      router.get('/report/:name', async function (req, res) {
        // get report based on name
        // note that the report is dynamically generated and returned
        let query = req.params.name;
      
        console.log("Getting results for : ", query);
      
        if (reportMapping[query]) {
          let result = await reportMapping[query].loadConfig(sequelize, req.decoded.admin)
          res.json(result);
          return;
        }
        res.json({});
      
      })
      
      router.get('/ping', function (req, res) {
        res.json({ "success": true, "message": "Done", name: req.decoded.name })
      })
}

module.exports = {
    configuration : config
}