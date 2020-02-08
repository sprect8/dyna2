function generateProductSFFV(app) {
    app.post('/product-ffv', function (req, res) {
      console.log(JSON.stringify(req.body));
  
    })
  }

  module.exports = {
    productFFV: generateProductSFFV
}