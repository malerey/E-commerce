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

module.exports = self;
