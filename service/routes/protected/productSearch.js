function generateProductSearch(app, sequelize) {
    app.post('/product-search', async function (req, res) {
      console.log(JSON.stringify(req.body));
  
      let query = req.body.requests[0];
      let user = req.decoded.admin;
      let page = query.params.page
  
      let replacements = [user]
  
      let categoryFilters = query.params.facetFilters;
      let countSel = 'SELECT count(*) FROM products a where a.owner_user_id = ?';
      let prodSel = `select a.prod_id, b.cate_desc, a.prod_name, a.prod_desc, a.prod_list_price, c.inv_id,
      sum(c.inv_units_in_stock) over (partition by prod_id) total
      from products a
      inner join product_categories b on a.prod_cate_id = b.cate_id
      left outer join inventories c
      on a.prod_id = c.inv_prod_id    
      where a.owner_user_id = ?     
      ${query.params.query && query.params.query !== "" ? "and c.inv_bar_code = ?" : ""}
      limit ${query.params.hitsPerPage} offset ${page}`;
      console.log(categoryFilters);
  
      if (query.params.query && query.params.query !== "") {
        replacements.push(query.params.query);
      }
  
      if (categoryFilters && categoryFilters.length > 0) {
        countSel = `SELECT count(*) FROM products a inner join product_categories b on a.prod_cate_id = b.cate_id 
        left outer join inventories c      
        on a.prod_id = c.inv_prod_id    
        where a.owner_user_id = ? 
        and b.cate_name in (?)`
        replacements.push(categoryFilters[0].map(x => {
          return x.substring(x.indexOf(":") + 1);
        }));
        prodSel = `SELECT a.prod_id, b.cate_desc, a.prod_name, a.prod_desc, a.prod_list_price, c.inv_id 
        FROM products a inner join product_categories b on a.prod_cate_id = b.cate_id
        left outer join inventories c      
        on a.prod_id = c.inv_prod_id     
        where a.owner_user_id = ? 
        ${query.params.query && query.params.query !== "" ? "and c.inv_bar_code = ?" : ""}  
        and b.cate_name in (?) limit ` + query.params.hitsPerPage + ' offset ' + page;
      }
  
      let total = await sequelize.query(countSel,
        { type: sequelize.QueryTypes.SELECT, replacements: replacements });
      total = total[0].count;
      total = +total;
      let result = await sequelize.query(prodSel,
        { type: sequelize.QueryTypes.SELECT, replacements: replacements });
  
      let pages = Math.round(total / query.params.hitsPerPage);
  
      let categories = {};
      let cat = await sequelize.query("select cate_name from product_categories where owner_user_id = ? order by cate_name asc",
        { type: sequelize.QueryTypes.SELECT, replacements: [user] });
  
      cat.forEach(x => { categories[x.cate_name] = 1 })
  
      // reduce results 
  
      let hits = result.map(x => {
        return {
          "total": +x.total,
          "categories": [x.cate_desc],
          "price": +x.prod_list_price,
          "rating": 4,
          "image": "/api/product/image/" + x.prod_id,
          "objectID": x.prod_id,
          "inventoryID": x.inv_id,
          "_snippetResult": {
            "description": {
              "value": x.prod_desc,
              "matchLevel": "none"
            }
          },
          "_highlightResult": {
            "name": {
              "value": x.prod_name
            },
            "description": {
              "value": x.prod_desc
            }
          }
        }
      })
  
  
      //sharedPersistenceMapping["product_categories"]
      //sharedPersistenceMapping["products"]
  
  
  
      res.json({
        "results": [{
          "hits": hits,
          "nbHits": total,
          "page": 0,
          "nbPages": pages,
          "hitsPerPage": 12,
          "processingTimeMS": 6,
          "facets": {
  
            "categories": categories
          },
          "facets_stats": {
  
          },
          "exhaustiveFacetsCount": true,
          "exhaustiveNbHits": true,
          "query": "",
          "params": "query=&hitsPerPage=12&maxValuesPerFacet=10&page=0&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&facets=%5B%22price%22%2C%22categories%22%2C%22rating%22%5D&tagFilters=&numericFilters=%5B%22rating%3C%3D5%22%5D",
          "index": "default_search"
        }, {
          "hits": [{
            "objectID": "9999119"
          }],
          "nbHits": 10000,
          "page": 0,
          "nbPages": 1000,
          "hitsPerPage": 1,
          "processingTimeMS": 1,
  
          "exhaustiveFacetsCount": true,
          "exhaustiveNbHits": true,
          "query": "",
          "params": "query=&hitsPerPage=1&maxValuesPerFacet=10&page=0&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=rating",
          "index": "default_search"
        }]
      }
      );
    });
  }

  module.exports = {
    productSerach: generateProductSearch
}