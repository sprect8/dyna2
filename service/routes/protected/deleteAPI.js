function deleteAPI(app, tableName, sharedPersistenceMapping) {
    app.delete("/" + tableName + "/:id", function (req, res) {
      //res.status(200).send([{ "A": "A" }, { "B": "B" }]);
  
      console.log("Delete called for table ", tableName);
  
      sharedPersistenceMapping[tableName].findById(req.params.id).then(inst => {
        if (inst) {
          if (inst.owner_user_id !== req.decoded.admin) {
            res.status(403).send({ "success": false, "error": "User does not own the row " + inst.owner_user_id + " != " + req.decoded.admin });
            return
          }
          inst.destroy()
            .then(() => {
              res.json({ "success": true });
            })
            .catch((e) => {
              console.log(e);
              res.status(400).send({ "success": false, "error": "Error failed because of " + e });
            });
        }
        else {
          res.status(404).send({ "success": false, "error": "Not Found" });
        }
      })
    });
  }

  module.exports = {
      deleteAPI : deleteAPI
  }