let self = {};
const productService = require("../services/productService");
const helper = require("./Helper");

self.getId = function(req, res) {
  const id = req.params.id;
  productService.getId(id).then(id_result => {
      productService.getDescription(id).then(description_result => {
          productService.getCategory(id_result.category_id).then(categories_result => {
            productService.getCurrency().then(currency_result => {
                  
              let categories = categories_result.path_from_root.map(
                    category => {
                      return category.name;
                    }
                  );

                  //formats condition for simple display in frontend
                  function formatCondition() {
                    if (id_result.condition == "new") {
                      return "Nuevo";
                    } else if (id_result.condition == "used") {
                      return "Usado";
                    } else return "";
                  }

                  const object = {
                    author: new helper().getAuthor(),
                    // this key is not requested in the exercise, but
                    // I considered it necessary to build the breadcrumb
                    categories: categories,
                    item: {
                      id: id_result.id,
                      title: id_result.title,
                      price: {
                        currency: new helper().getCurrency(
                          currency_result,
                          id_result
                        ),
                        amount: Math.floor(id_result.price),
                        decimals: new helper().formatDecimals(id_result)
                      },
                      picture: id_result.pictures[0].secure_url,
                      condition: formatCondition(),
                      free_shipping: id_result.shipping.free_shipping,
                      sold_quantity: id_result.sold_quantity,
                      description: description_result.plain_text
                    }
                  };
                  return res.json(object);
                })
                .catch(function(err) {
                  console.log(err);
                });
            })
            .catch(function(err) {
              console.log(err);
            });
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