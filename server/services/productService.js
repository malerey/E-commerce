let self = {};

const rest = require('restler')


self.getid = function(id) {
    console.log('getid service 1' + id)
    const idPromise = new Promise((resolve, reject) => {
        rest.get('https://api.mercadolibre.com/items/' + id).on('complete', function(result) {
            console.log(result)
            resolve(result);
          })
        
    })

    return idPromise
      
}
      
self.getdesc = function(id) {
    console.log('getdesc service 1' + id)
    const descPromise = new Promise((resolve, reject) => {
        rest.get('https://api.mercadolibre.com/items/' + id + '/description').on('complete', function(result) {
            console.log(result)
            resolve(result);
          })
        
    })

    return descPromise
      
}


self.getCategory = function(categoryId) {
    console.log("category service 1" + categoryId)
    const catPromise = new Promise((resolve, reject) => {
        rest.get('https://api.mercadolibre.com/categories/' + categoryId).on('complete', function(result) {
            console.log(result)
            resolve(result);
          })
        
    })

    return catPromise


}

module.exports = self