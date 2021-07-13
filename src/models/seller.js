const db = require('../configs/db');
const logger = require('../helpers/logger');
const sellerDB = {};

sellerDB.addData = (data) => {
	return new Promise((resolve, reject) => {
		db.query(
			'INSERT INTO public.seller (name, email, phone_number, pass,store_name)VALUES($1, $2, $3,$4,$5)',
			[data.name, data.email, data.phone_number, data.pass, data.store_name]
		)
			.then((res) => {
				resolve(res.rows);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

sellerDB.getByEmail = (email) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM public.seller WHERE email='${email}'`)
			.then((res) => {
				resolve(res.rows);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

sellerDB.addPass = (data) => {
	return new Promise((resolve, reject) => {
		db.query(
			`UPDATE public.seller SET pass='${data.pass}' where email='${data.email}'`
		)
			.then((res) => {
				resolve({ msg: 'Password changed !' });
			})
			.catch((err) => {
				reject(err);
			});
	});
};

module.exports = sellerDB;
