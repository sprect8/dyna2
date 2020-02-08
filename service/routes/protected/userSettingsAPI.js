let userSettings = (router, sharedPersistenceMapping) => {
    router.get('/user-settings', function (req, res) {
    // get user details
    // get settings if exist; if not return blank
  
    sharedPersistenceMapping["users"].findById(req.decoded.admin).then(u => {
      // user must exist
      sharedPersistenceMapping["settings"].findOne({ where: { "sett_user_id": req.decoded.admin } }).then(r => {
        // no result? return empty with user id set
  
        if (!r) {
          r = { "sett_user_id": req.decoded.admin };
        }
        u.user_password = "";
        u.user_user_pics = "/api/user/" + req.decoded.admin; // do not send
        let results = { user: u, settings: r }
  
        res.json(results);
      }).catch(e => {
        res.status(403).json({ success: false, "message": "Failed because " + e })
      })
    }).catch(e => {
      res.status(403).json({ success: false, "message": "Failed because " + e })
    });
  })
  
  router.put('/user-settings', function (req, res) {
    let body = req.body;
  
    if (body.user_id !== req.decoded.admin) {
      console.log("No permission because the user_id does not match the admin id", body.user_id, req.decoded.admin)
      res.status(403).json({ success: false, "message": "No permission to edit user" });
      return;
    }
  
    // resolve references first
    // assume data saved will be from the id (and not the value)
    sharedPersistenceMapping["users"].findById(body["user_id"]).then(inst => {
      if (!inst) {
        res.json({ "success": false, message: "Failed to update because we could not find the instance" });
        return;
      }
  
      if (body.user_password && body.user_password !== "") {
        body.user_password = bcrypt.hashSync(body.user_password, 10);
        console.log("Password was updated");
      } 
      else {
        delete body.user_password;
      }
  
      inst.update(body)
        .then(i => {
          i.user_password = "";
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
    userSettings
}