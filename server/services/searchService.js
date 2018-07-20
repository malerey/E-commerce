let self = {};

const rest = require('restler');

self.getQuery = function(query) {
  const queryPromise = new Promise((resolve, reject) => {
    rest
      .get(
        'https://api.mercadolibre.com/sites/MLA/search?q=' + query + '&limit=4'
      )
      .on('complete', function(result) {
        resolve(result)
      }).on('fail', function(err) {
        reject(err)
      })
  });

  return queryPromise;
};

self.getCurrency = function() {
  const currPromise = new Promise((resolve, reject) => {
    rest
      .get(
        'https://api.mercadolibre.com/currencies/'
      )
      .on('complete', function(result) {
        resolve(result)
      }).on('fail', function(err) {
        reject(err)
      })
      });
  return currPromise
}

module.exports = self;
