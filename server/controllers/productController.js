let self = {};
const productService = require('../services/productService');


self.getId = function(req, res) {
  const id = req.params.id;

  productService.getId(id).then(id_result => {
    productService.getDescription(id).then(description_result => {
      productService.getCategory(id_result.category_id).then(categories_result => {
        productService.getCurrency().then(currency_result => {
        
          let categories = categories_result.path_from_root.map(category => {
            return category.name;
          });

          const final_price = Math.floor(id_result.price);
          let unformatted_decimals = id_result.price.toString().split('.');
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
                if (symbolmap.id == id_result.currency_id) {
                  currency_symbol = symbolmap.symbol
                }
              })
            return currency_symbol
          }

          function formatCondition() {
            if (id_result.condition == 'new') {
              return "Nuevo"
            } else if (id_result.condition == 'used') {
              return "Usado"
            } else return ''
          }

          const object = {
            author: {
              name: 'Maria Elena',
              lastname: 'Rey'
            },
            categories: categories,
            // this key is not requested in the exercise, but
            // I considered it necessary to build the breadcrumb
            item: {
              id: id_result.id,
              title: id_result.title,
              price: {
                currency: getCurrency(currency_result),
                amount: final_price,
                decimals: decimals
              },
              picture: id_result.pictures[0].secure_url,
              condition: formatCondition(),
              free_shipping: id_result.shipping.free_shipping,
              sold_quantity: id_result.sold_quantity,
              description: description_result.plain_text
            }
          };
          res.json(object);
        }).catch(function(err) {
          console.log(err)
        });
      }).catch(function(err) {
        console.log(err)
      });
    }).catch(function(err) {
      console.log(err)
    });
  }).catch(function(err) {
    console.log(err)
  });
};

module.exports = self;