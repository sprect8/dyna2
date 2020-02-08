const noImage = "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";

function generateProductImage(app, sharedPersistenceMapping) {
  app.get('/product/image/:productId', (req, res) => {

    // query for first 20 items matching the search
    // if empty we return firt 20 items
    // order it by the display

    let query = req.params.productId;
    let user = req.decoded.admin;

    sharedPersistenceMapping["products"].findById(query).then(inst => {
      let img = "";
      let type = "image/png";
      if (inst === null || !inst.prod_picture || inst.prod_picture === "" || inst.owner_user_id !== user) {
        // 
        // send not-found image
        img = new Buffer(noImage, "base64");
      }
      else {
        let pic = inst.prod_picture.substring(inst.prod_picture.indexOf(","));
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
    productImage: generateProductImage
}