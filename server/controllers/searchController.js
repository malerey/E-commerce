let self = {};
const searchService = require('../services/searchService');


self.getQuery = function(req, res) {
  const query = req.query.q;
  searchService.getQuery(query).then(result => {
    searchService.getCurrency().then(currency_result => { 

    function getAuthor() {
      return {
        name: 'Maria Elena',
        lastname: 'Rey'
      };
    }

    function getCategories(result) {
      const filtersExist = result.filters[0] ? result.filters[0] : [];
      let categories = [];
      if (filtersExist == result.filters[0]) {
        categories = filtersExist.values[0].path_from_root.map(category => {
          return category.name;
        });
      } else {
        let filterarray = [];
        result.available_filters[0].values.map(filterresults => {
          filterarray.push(filterresults);
          return filterarray;
        });
        let maxresult = filterarray[0];
        for (var i = 1; i < filterarray.length; i++) {
          if (maxresult.results <= filterarray[i].results) {
            maxresult = filterarray[i];
          }
        }
        categories = maxresult.name.split();
      }
      return categories;
    }

    function getItems(items) {
      
      return items.map(item => {

          let unformatted_decimals = item.price.toString().split('.');
          let decimals = formatprice(unformatted_decimals);

          function formatprice() {
            if (!parseInt(unformatted_decimals[1])) {
              return '00';
            } else if (parseInt(unformatted_decimals[1]) < 10) {
              return parseInt(unformatted_decimals[1]) * 10;
            } else {
              return parseInt(unformatted_decimals[1]);
            }
          }

          function getCurrency(currency_result) {
            let currency_symbol = ''
            currency_result.map(symbolmap => {
                if (symbolmap.id == item.currency_id) {
                  currency_symbol = symbolmap.symbol
                }
              })
            return currency_symbol
        }

        return {
          id: item.id,
          title: item.title,
          price: {
            currency: getCurrency(currency_result),
            amount: Math.floor(item.price),
            decimals: decimals
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
          location: item.address.state_name
          // this key is not requested in the exercise, but
          // I considered it necessary to display the address
        };
      });
    }

    function format(result) {
        const qresult = {};
        qresult.author = getAuthor();
        qresult.categories = getCategories(result);
        qresult.items = getItems(result.results);
        return qresult;
      }
      res.json(format(result));
    }).catch(function(err) {
      console.log(err)
    });
  }).catch(function(err) {
    console.log(err)
  });
};

module.exports = self;
