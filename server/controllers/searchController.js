let self = {}
const searchService = require('../services/searchService')


self.getquery = function(req, res) {
    const query = req.query.q;
    searchService.getquery(query).then((result) => {

        function getauthor() {
            return {
                name: 'Maria Elena',
                lastname: 'Rey'
            };
        }

        function getcategories(result) {
            const filtersExist = result.filters[0] ? result.filters[0] : [];
            let categories = [];

            if (filtersExist == result.filters[0]) {
                categories = filtersExist.values[0].path_from_root.map((category) => {
                    return category.name;
                });
            } else {
                let filterarray = []
                result.available_filters[0].values.map((filterresults) => {
                    filterarray.push(filterresults)
                    return filterarray
                });
                let maxresult = filterarray[0]

                for (var i = 1; i < filterarray.length; i++) {
                    if (maxresult.results <= filterarray[i].results) {
                        maxresult = filterarray[i]
                    }
                }
                categories = maxresult.name
                categories = categories.split()
            }
            return categories;
        }

        function getitems(items) {



                
            return items.map((item) => {

                let splitted = item.price.toString().split(".")
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

                return {
                    id: item.id,
                    title: item.title,
                    price: {
                        currency: item.currency_id,
                            amount: Math.floor(item.price), 
                            decimals: decimals, 
                        
                    },
                    picture: item.thumbnail,
                    condition: item.condition,
                    free_shipping: item.shipping.free_shipping,
                    location: item.address.state_name,
                    // this key is not requested in the exercise, but 
                    // I considered it necessary to display the address
                };
            });
        }


        function format(result) {
            const qresult = {};
            qresult.author = getauthor();
            qresult.categories = getcategories(result);
            qresult.items = getitems(result.results);
            return qresult;
        }

        res.json(format(result));

    })

}

module.exports = self