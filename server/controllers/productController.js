let self = {}
const productService = require('../services/productService')


self.getid = function(req, res) {
    const id = req.params.id;

    productService.getid(id).then((idresult) => {

        productService.getdesc(id).then((descresult) => {

            productService.getCategory(idresult.category_id).then((catresult) => {

                let categories = catresult.path_from_root.map((category) => {
                    console.log("category " + category.name)
                    return category.name;
                });

                let finalprice = Math.floor(idresult.price)
                let splitted = idresult.price.toString().split(".")
                let decimals = decimalss(splitted)
                function decimalss() {
                    if (!parseInt(splitted[1])) {
                        return "00"
                        } else if (parseInt(splitted[1]) < 10) {
                            return parseInt(splitted[1])*10
                        } else  {
                            return parseInt(splitted[1])
                        }
                    }

            const object = {
                'author': {
                    'name': "Maria Elena",
                    'lastname': "Rey"
                },                
                'categories': categories, 
                    // this key is not requested in the exercise, but 
                    // I considered it necessary to build the breadcrumb
                'item': {
                    'id': idresult.id,
                    'title': idresult.title,
                    'price': {
                        'currency': idresult.currency_id,
                        'amount': finalprice,
                        'decimals': decimals,
                    },
                    'picture': idresult.pictures[0].secure_url,
                    'condition': idresult.condition,
                    'free_shipping': idresult.shipping.free_shipping,
                    'sold_quantity': idresult.sold_quantity,
                    'description': descresult.plain_text,
                }
            }

            res.json(object)
        })

            
        })
    })
}




module.exports = self