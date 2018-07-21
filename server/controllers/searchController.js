let self = {};
const searchService = require("../services/searchService");
const helper = require("./Helper");

self.getQuery = function(req, res) {
  const query = req.query.q;
  searchService.getQuery(query).then(result => {
      searchService.getCurrency().then(currency_result => {
          
        function getItems(items) {
            return items.map(item => {
              return {
                id: item.id,
                title: item.title,
                price: {
                  currency: new helper().getCurrency(currency_result, item),
                  amount: Math.floor(item.price),
                  decimals: new helper().formatDecimals(item)
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                // this key is not requested in the exercise, but
                // I considered it necessary to display the address
                location: item.address.state_name
              };
            });
          }

          function format(result) {
            const queryResult = {};
            queryResult.author = new helper().getAuthor();
            queryResult.categories = new helper().getSearchCategories(result);
            queryResult.items = getItems(result.results);
            return queryResult;
          }
          return res.json(format(result));
        })
        .catch(function(err) {
          console.log(err);
        });
    })
    .catch(function(err) {
      console.log(err);
    });
};

module.exports = self;
