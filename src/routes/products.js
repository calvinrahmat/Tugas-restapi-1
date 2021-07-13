const express = require('express');
const router = express.Router();
const ctrlProducts = require('../controllers/products');
const validate = require('../middleware/validate');
const cache = require('../middleware/cache');

router.get('/', cache.productCache, ctrlProducts.getAllProducts);
router.get(
	'/Kategori/:kategori_id',
	cache.productCache,
	ctrlProducts.getCategory
);
router.get('/search/nama', cache.productCache, ctrlProducts.searchData);
router.get('/search/seller', cache.productCache, ctrlProducts.filterSeller);
router.get('/sort', cache.productCache, ctrlProducts.sort);
router.post('/addToBag', validate('customer'), ctrlProducts.addToBag);
module.exports = router;
