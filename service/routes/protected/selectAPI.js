async function resolveDependencies(conf, records, sharedPersistenceMapping, configurationMapping) {
    let configs = conf.table.columns.filter(x => (x.ref))
    console.log("Configs is ", configs);
    for (const c in configs) {
  
      let config = configs[c];
  
      let tableName = config.ref.toLowerCase();
      let tableRef = configurationMapping[tableName];
      let key = tableRef.key;
      let disp = tableRef.display;
  
      for (const r in records) {
        let record = records[r];
  
        console.log(record[config.name], config.name, tableName);
        let inst = await sharedPersistenceMapping[tableName].findById(record[config.name]);
  
        // cannot be null
  
        record[config.name] = inst[disp];
        console.log("We found something", record[config.name]);
      }
    }
  }

function selectAPI(app, conf, sharedPersistenceMapping, configurationMapping) {
    let tableName = conf.table.tableName.toLowerCase();
  
    app.get("/" + tableName, function (req, res) {
  
      //console.log("Get request called for table ", tableName);
      //res.status(200).send([{ "A": "A" }, { "B": "B" }]);
      // get the paging
      // get the size
      // get any ordering requests
      let page = 0;
      let size = 20;
      let order = null;
      let column = null;
  
      let config = { limit: size, offset: page };
      config.where = { "owner_user_id": req.decoded.admin }
  
      if (order && column) {
        config.order = [[column, order]];
      }
  
      sharedPersistenceMapping[tableName].findAll(config).then(r => {
  
        console.log("Dependencies resolved", r)
        resolveDependencies(conf, r, sharedPersistenceMapping, configurationMapping).then(rx => {
          console.log("Resolved results", r);
          res.json(r);
        })
  
        // resolve references
        // the value that is saved will be the id, but the ui wants the value as the display name
      })
  
    });
  }

  module.exports = {
      selectAPI : selectAPI
  }