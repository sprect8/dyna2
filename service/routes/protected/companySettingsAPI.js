let companySettings = (router, sharedPersistenceMapping)=>{
    router.put('/company-settings', function (req, res) {
        let body = req.body;
      
        console.log("IDs are ", body.sett_user_id, req.decoded.admin);
      
        if (body.sett_user_id !== req.decoded.admin) {
          res.status(403).json({ success: false, "message": "No permission to edit company settings" });
          return;
        }
      
        if (!body.sett_id) {
          
          sharedPersistenceMapping["settings"].create(body)
            .then(i => {
              res.json(i); // return as json instance
            })
            .catch(e => {
              console.log(e);
              res.status(400).json({ "success": false, message: "Failed because of " + e });
            });
          return;
        }
      
        // resolve references first
        // assume data saved will be from the id (and not the value)
        sharedPersistenceMapping["settings"].findById(body["sett_id"]).then(inst => {
          if (!inst) {
            res.json({ "success": false, message: "Failed to update because we could not find the instance" });
            return;
          }
      
          if (inst.sett_user_id !== req.decoded.admin) {
      
            console.log("IDs are ", inst.owner_user_id, req.decoded.admin, inst);
      
            res.status(403).json({ success: false, "message": "No permission to edit company settings" });
            return;
          }
          inst.update(body)
            .then(i => {
              res.json(i); // return as json instance
            })
            .catch(e => {
              console.log(e);
              res.status(400).json({ success: false, message: "Failed internal error " + e });
            });
        })
      })
}

module.exports = {
    companySettings
}