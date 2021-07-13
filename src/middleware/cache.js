const handler = require('../helpers/errorhandler');
const { redisDb } = require('../configs/redis');
const logger = require('../helpers/logger');

const getAllProductsFromCache = (req, res, next) => {
	redisDb.get('products', (err, data) => {
		if (err) {
			return handler(res, 500, err, true);
		}
		if (data !== null) {
			const result = JSON.parse(data);
			logger.debug('data dari redis');
			return handler(res, 200, result);
		} else {
			next();
		}
	});
};

const getAllBagFromCache = (req, res, next) => {
	redisDb.get('bag', (err, data) => {
		if (err) {
			return handler(res, 500, err, true);
		}
		if (data !== null) {
			const result = JSON.parse(data);
			logger.debug('data dari redis');
			return handler(res, 200, result);
		} else {
			next();
		}
	});
};

const getAllProductsSellerFromCache = (req, res, next) => {
	redisDb.get('seller', (err, data) => {
		if (err) {
			return handler(res, 500, err, true);
		}
		if (data !== null) {
			const result = JSON.parse(data);
			logger.debug('data dari redis');
			return handler(res, 200, result);
		} else {
			next();
		}
	});
};

module.exports = {
	productCache: getAllProductsFromCache,
	bagCache: getAllBagFromCache,
	sellerCache: getAllProductsSellerFromCache,
};
