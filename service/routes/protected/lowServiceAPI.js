function createLOVService(app, conf, sharedPersistenceMapping, Sequelize) {
    app.get("/lov/" + conf.table.tableName.toLowerCase() + "/:query", function (req, res) {
      let key = conf.table.key;
      let display = conf.table.display;
      let table = conf.table.tableName.toLowerCase();
  
      // query for first 20 items matching the search
      // if empty we return firt 20 items
      // order it by the display
  
      let query = req.params.query;
      if (query)
        query = query.toLowerCase().trim();
      if (query === "**") {
        query = "";
      }
      let user = req.decoded.admin
      // like search on the name (display)
      // on key
      const Op = Sequelize.Op;
  
      let where = { owner_user_id: user, };
  
      if (query) {
        where = {
          [display]: { [Op.iLike]: query + "%" }
        };
      }
  
      let r = (where) => {
        sharedPersistenceMapping[table].findAll({
          attributes: [key, display],
          where: where
        }).then(r => {
          res.json(r.map(m => { return { id: "" + m[key], label: m[display] } }));
        });
      }
  
      try {
        r(where);
      }
      catch (e) {
        delete r[display];
        r(where);
      }
    });
  }
  
  module.exports = {
    lovService: createLOVService
}