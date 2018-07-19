let self = {};
const rest = require('restler');
const url = 'https://api.mercadolibre.com'

self.getid = function(id) {
  const idPromise = new Promise((resolve, reject) => {
    rest
      .get(url + '/items/' + id)
      .on('complete', function(result) {
        resolve(result);
      });
  });

  return idPromise;
};

self.getdesc = function(id) {
  const descPromise = new Promise((resolve, reject) => {
    rest
      .get(url + '/items/' + id + '/description')
      .on('complete', function(result) {
        resolve(result);
      });
  });

  return descPromise;
};

self.getCategory = function(categoryId) {
  const catPromise = new Promise((resolve, reject) => {
    rest
      .get(url + '/categories/' + categoryId)
      .on('complete', function(result) {
        resolve(result);
      });
  });

  return catPromise;
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
