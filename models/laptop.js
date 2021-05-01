const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 5
	},
	description: {
		type: String,
		minlength: 5,
		required: true,
	},
	brand: {
		type: String,
		minlength: 2,
		required: true,
	},
	insideTheBox: [
		{
			type: String,
			minlength: 2,
			required: true,
		}
	],
	onePrice: {
		type: Number,
		required: true,
	},
	threePrice: {
		type: Number,
		required: true,
	},
	sixPrice: {
		type: Number,
		required: true,
	},
	twelvePrice: {
		type: Number,
		required: true,
	},
	model: {
		type: String,
		minlength: 2,
	},
	memory: {
		type: Number,
		required: true,
	},
	display: {
		type: String,
		minlength: 2,
		required: true,
	},
	storage: {
		type: String,
		minlength: 2,
		required: true,
	},
	graphics: {
		type: String,
		minlength: 2,
		required: true,
	},
	processor: {
		type: String,
		minlength: 2,
		required: true,
	},
	dimensions: {
		type: String,
		minlength: 2,
		required: true,
	},
	operatingSystem: {
		type: String,
		minlength: 2,
		required: true,
	},
	keyboardLanguage: {
		type: String,
		minlength: 2,
		required: true,
	},
	variants: [
		{
			color: {
				type: String,
				minlength: 2,
				required: true
			},
			unitsInTheWarehouse: {
				type: Number,
				minlength: 2,
				required: true
			}
		}
	]
})

module.exports = mongoose.model('Laptop', schema)