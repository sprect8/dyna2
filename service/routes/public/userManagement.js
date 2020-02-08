let userManagement = (app, sharedPersistenceMapping)=>{
    app.post("/resetpass", function(req, res) {
        let payload = req.body;
      
        if (payload.authKey !== "Dynapreneur2018") {
          res.json({success: false, message:"Invalid Auth Key"});
          return;
        }
        payload.user_timestamp = new Date().getTime();
        payload.user_password = bcrypt.hashSync(payload.user_password, 10);
      
        
        sharedPersistenceMapping["users"].findOne({where:{user_name: payload.user_name}}).then(r => {
          if (!r) {
            res.json({ success: false, message: "Failed to reset password, user not found" })
          }
          else {
            r.update(payload, { fields: Object.keys(payload).filter(e => { return e.startsWith("user_"); }) }).then(inst=>{
              res.json({ success: true, userId: inst.user_id });
            })      
            .catch(e=>{    
              res.json({ success: false, message: "Failed to reset user password" });
            })
          }
        }).catch(e => {
          console.log("Failed creating user because of ", e);
          res.json({ success: false, message: "Failed to reset user password" });
        })
      })
      
      app.get("/uuid", function(req, res){
        res.json({"uuid":uuid()});
      });
      
      app.post("/register", function (req, res) {
        // create a new user
        // we need to admin key when login, and this key is hard coded 
      
        let payload = req.body.payload;
      
        if (payload.authKey !== "Datalytics2020") {
          res.json({ success: false, message: "Invalid Auth Key" });
          return;
        }
      
        payload.user_name = payload.user_name.toUpperCase();
        payload.user_status = 'ACTIVE';
        payload.user_timestamp = new Date().getTime();
        payload.user_password = bcrypt.hashSync(payload.user_password, 10);
      
        sharedPersistenceMapping["users"].create(payload, { fields: Object.keys(payload).filter(e => { return e.startsWith("user_"); }) }).then(r => {
          if (!r) {
            res.json({ success: false, message: "Failed to create user" })
          }
          else {
            res.json({ success: true, userId: r.user_id });
          }
        }).catch(e => {
          console.log("Failed creating user because of ", e);
          res.json({ success: false, message: "Failed to create user" });
        })
      });
 
      app.post('/login', function (req, res) {

        // find the user
        sharedPersistenceMapping["users"].findOne({
          where: {
            user_name: req.body.name
          }
        }).then((user) => {
      
          if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
            sharedPersistenceMapping["user_audits"].create(
              {user_id: user.user_id, user_timestamp: new Date().getTime(), user_status: "FAILED"}
            );
          } else if (user) {
      
            // check if password matches
            if (!bcrypt.compareSync(req.body.password, user.user_password)) {
              res.json({ success: false, message: 'Authentication failed. Wrong password.' });
              sharedPersistenceMapping["user_audits"].create(
                {user_id: user.user_id, user_timestamp: new Date().getTime(), user_status: "FAILED"}
              );
            } else {
      
              // if user is found and password is right
              // create a token with only our given payload
              // we don't want to pass in the entire user since that has the password
              const payload = {
                admin: user.user_id,// i want the user name
                name: user.user_fname + " " + user.user_lname
              };
              var token = jwt.sign(payload, app.get('superSecret'), {
                expiresIn: 86400 // expires in 24 hours
              });
      
              // return the information including token as JSON
      
              var date = new Date();
              date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
      
              const cookie = {
                httpOnly: true,
                expires: date
              }
      
              // update the user.updatedAt to now() 
              // 
              sharedPersistenceMapping["user_audits"].create(
                {user_id: user.user_id, user_timestamp: new Date().getTime(), user_status: "SUCCESS"}
              );
      
      
              res.cookie('authToken', token, cookie);
              res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token,
                name: user.user_fname + " " + user.user_lname
              });
            }
          }
      
        }).catch(e => {
          throw e;
        });
      });
}

module.exports = {
    userManagement
}