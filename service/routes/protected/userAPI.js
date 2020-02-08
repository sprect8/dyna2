function userAPI(router, sharedPersistenceMapping) {
    router.get('/user/:userId', (req, res) => {

        // query for first 20 items matching the search
        // if empty we return firt 20 items
        // order it by the display
      
        let query = req.params.userId;
        let user = req.decoded.admin;
      
        sharedPersistenceMapping["users"].findById(query).then(inst => {
          let img = "";
          let type = "image/png";
          if (inst === null || !inst.user_user_pics || inst.user_user_pics === "" || inst.user_id !== user) {
            // 
            // send not-found image
            img = new Buffer(noImage, "base64");
          }
          else {
            let pic = inst.user_user_pics.substring(inst.user_user_pics.indexOf(","));
            img = new Buffer(pic, "base64");
          }
      
          res.writeHead(200, {
            'Content-Type': type,
            'Content-Length': img.length
          });
          res.end(img);
        });
      })
}

module.exports = {
    userAPI
}