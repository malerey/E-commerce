var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');
const searchController = require('../controllers/searchController');

router.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/* GET home page. */

router.get('/api/items', searchController.getQuery);
router.get('/api/items/:id', productController.getId);

module.exports = router;
