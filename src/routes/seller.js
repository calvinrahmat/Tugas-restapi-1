const express = require('express');
const router = express.Router();
const ctrlSeller = require('../controllers/account');
const ctrlProduct = require('../controllers/products');
const validate = require('../middleware/validate');
const cache = require('../middleware/cache');
const uploads = require('../middleware/upload');

router.post('/registration', ctrlSeller.seller.sellerRegistration);
router.put('/reset-password', ctrlSeller.seller.resetPassword);
router.get(
	'/:seller',
	validate('seller'),
	cache.sellerCache,
	ctrlProduct.getProductSeller
);
router.post(
	'/addProduct',
	validate('seller'),
	uploads.single('img'),
	ctrlProduct.addToProduct
);
router.delete('/delete', validate('seller'), ctrlProduct.deleteProduct);
router.put(
	'/updateProduct',
	validate('seller'),
	uploads.single('img'),
	ctrlProduct.updateProduct
);

module.exports = router;
