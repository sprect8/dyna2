function scanAPI(app, sharedPersistenceMapping) {
    let tableName = "inventories";
  
    app.get("/scan/:barcode", function (req, res) {
  
      //console.log("Get request called for table ", tableName);
      //res.status(200).send([{ "A": "A" }, { "B": "B" }]);
      // get the paging
      // get the size
      // get any ordering requests
      let config = {};
      config.where = { "owner_user_id": req.decoded.admin, "inv_bar_code": req.params.barcode }
  
      sharedPersistenceMapping[tableName].findAll(config).then(r => {
  
        if (r) {
          return res.json(r);
        }
        else {
          return res.json({ "success": "false", "message": "No product found with barcode " + req.params.barcode });
        }
        // resolve references
        // the value that is saved will be the id, but the ui wants the value as the display name
      })
    });
  }

module.exports = {
    scanAPI
}