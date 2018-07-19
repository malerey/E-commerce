let self = {};

const rest = require('restler');

self.getquery = function(query) {
  const queryPromise = new Promise((resolve, reject) => {
    rest
      .get(
        'https://api.mercadolibre.com/sites/MLA/search?q=' + query + '&limit=4'
      )
      .on('complete', function(result) {
        resolve(result);
      });
  });

  return queryPromise;
};

self.getcurrency = function() {
  const currPromise = new Promise((resolve, reject) => {
    rest
      .get(
        'https://api.mercadolibre.com/currencies/'
      )
      .on('complete', function(result) {
        resolve(result);
      });
  });
  return currPromise
}

module.exports = self;
