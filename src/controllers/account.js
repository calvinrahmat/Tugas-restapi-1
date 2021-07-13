const sellerMethod = {};
const userMethod = {};
const modelSeller = require('../models/seller');
const modelUser = require('../models/users');
const handler = require('../helpers/errorhandler');
const hash = require('../helpers/hash');

sellerMethod.sellerRegistration = async (req, res) => {
	try {
		const check = await modelSeller.getByEmail(req.body.email);
		const hashedPass = await hash(req.body.pass);
		const data = {
			name: req.body.name,
			email: req.body.email,
			phone_number: req.body.phone_number,
			store_name: req.body.store_name,
			pass: hashedPass,
		};
		if (check.length > 0) {
			return handler(res, 200, { msg: 'email sudah terdaftar !' });
		}
		const result = await modelSeller.addData(data);
		return handler(res, 200, result);
	} catch (error) {
		console.log(error);
		return handler(res, 500, error, true);
	}
};

sellerMethod.resetPassword = async (req, res) => {
	try {
		const check = await modelSeller.getByEmail(req.body.email);
		if (check.length <= 0) {
			return handler(res, 200, { msg: 'email tidak terdaftar !' });
		}
		const result = await modelSeller.addPass(req.body);
		return handler(res, 200, result);
	} catch (error) {
		return handler(res, 500, error, true);
	}
};

userMethod.userRegistration = async (req, res) => {
	try {
		const check = await modelUser.getByEmail(req.body.email);
		const hashedPass = await hash(req.body.pass);
		const data = {
			name: req.body.name,
			email: req.body.email,
			pass: hashedPass,
		};
		if (check.length > 0) {
			return handler(res, 200, { msg: 'email sudah terdaftar !' });
		}
		const result = await modelUser.addData(data);
		return handler(res, 200, result);
	} catch (error) {
		console.log(error);
		return handler(res, 500, error, true);
	}
};

userMethod.resetPassword = async (req, res) => {
	try {
		const check = await modelUser.getByEmail(req.body.email);
		if (check.length <= 0) {
			return handler(res, 200, { msg: 'email tidak terdaftar !' });
		}
		const result = await modelUser.addPass(req.body);
		return handler(res, 200, result);
	} catch (error) {
		return handler(res, 500, error, true);
	}
};

userMethod.getAll = async (req, res) => {
	try {
		const result = await modelUser.getAll();
		handler(res, 200, result);
	} catch (error) {
		handler(res, 400, error);
	}
};

module.exports = {
	seller: sellerMethod,
	user: userMethod,
};
