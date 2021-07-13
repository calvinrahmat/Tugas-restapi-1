const productsMethod = {};
const modelProduct = require('../models/products');
const handler = require('../helpers/errorhandler');
const uploadToCloudinary = require('../helpers/upload_cloud');
const { redisDb } = require('../configs/redis');
const logger = require('../helpers/logger');

productsMethod.getAllProducts = async (req, res) => {
	try {
		const result = await modelProduct.getAll();
		const data = JSON.stringify(result);
		logger.debug('data dari postgre');
		redisDb.setex('products', 20, data);
		handler(res, 200, result);
	} catch (error) {
		handler(res, 400, error);
	}
};

productsMethod.getCategory = async (req, res) => {
	try {
		const result = await modelProduct.filterCategory(req.params.kategori_id);
		handler(res, 200, result);
	} catch (error) {
		handler(res, 400, error);
	}
};

productsMethod.searchData = async (req, res) => {
	try {
		const result = await modelProduct.search(req.query.p);
		handler(res, 200, result);
	} catch (error) {
		handler(res, 400, error);
	}
};

productsMethod.filterSeller = async (req, res) => {
	try {
		logger.debug(req.query.st);
		const result = await modelProduct.search(req.query.st);
		logger.debug('data dari postgre');
		handler(res, 200, result);
	} catch (error) {
		handler(res, 400, error);
	}
};

productsMethod.sort = async (req, res) => {
	try {
		const key = req.query.ob;
		if (key == 1) {
			const result = await modelProduct.sortPriceExpensive();
			handler(res, 200, result);
		}
		if (key == 2) {
			const result = await modelProduct.sortPriceCheapest();
			handler(res, 200, result);
		}
		if (key == 3) {
			const result = await modelProduct.sortNameAsc();
			handler(res, 200, result);
		}
		if (key == 4) {
			const result = await modelProduct.sortNameDesc();
			handler(res, 200, result);
		}
		if (key == 5) {
			const result = await modelProduct.sortNewest();
			handler(res, 200, result);
		}
		if (key == 6) {
			const result = await modelProduct.sortOldest();
			handler(res, 200, result);
			l;
			res.send('no sorting available');
		}
	} catch (error) {
		handler(res, 400, error);
	}
};

productsMethod.addToBag = async (req, res) => {
	try {
		const result = await modelProduct.addItemBag(req.body);
		redisDb.del('product');
		handler(res, 200, result);
	} catch (error) {
		handler(res, 400, error);
	}
};

productsMethod.updateProduct = async (req, res) => {
	try {
		const check = await modelProduct.getId(req.body.id);
		let urlImage = '';
		if (check.length <= 0) {
			return handler(res, 200, { msg: 'wrong product id!' });
		} else if (req.file !== undefined) {
			urlImage = await uploadToCloudinary(req.file.path);
		}
		const data = {
			nama: req.body.nama,
			seller: req.body.seller,
			kategori: req.body.kategori,
			kategori_id: req.body.kategori_id,
			harga: req.body.harga,
			img: urlImage || req.file.path,
			id: req.body.id,
		};
		console.log(data);
		const result = await modelProduct.changeProduct(data);
		redisDb.del('product');
		handler(res, 200, result);
	} catch (error) {
		console.log(error);
		handler(res, 400, error);
	}
};

productsMethod.deleteProduct = async (req, res) => {
	try {
		console.log(req.query.id);
		const result = await modelProduct.delete(req.query.id);
		redisDb.del('product');
		handler(res, 200, result);
	} catch (error) {
		handler(res, 400, error);
	}
};

productsMethod.addToProduct = async (req, res) => {
	try {
		let urlImage = '';
		if (req.file !== undefined) {
			urlImage = await uploadToCloudinary(req.file.path);
		}
		const data = {
			nama: req.body.nama,
			seller: req.body.seller,
			kategori: req.body.kategori,
			harga: req.body.harga,
			kategori_id: req.body.kategori_id,
			img: urlImage || req.file.path,
		};

		const result = await modelProduct.addProduct(data);
		redisDb.del('product');
		handler(res, 200, result);
	} catch (error) {
		console.log(error);
		handler(res, 400, error);
	}
};

productsMethod.getProductSeller = async (req, res) => {
	try {
		const result = await modelProduct.getSeller(req.params.seller);
		handler(res, 200, result);
	} catch (error) {
		console.log(error);
		handler(res, 400, error);
	}
};

module.exports = productsMethod;
