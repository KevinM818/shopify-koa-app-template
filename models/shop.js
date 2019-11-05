const mongoose = require('mongoose');

const Shop = new mongoose.Schema({
	shop: String,
	accessToken: String
});

module.exports = mongoose.model('Shop', Shop);