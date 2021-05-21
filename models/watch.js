const mongoose = require('mongoose')

const watchSchema = new mongoose.Schema({
	watchName: {
		type: String,
		required: true,
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
	type: {
		type: String,
		minlength: 2,
		required: true,
	},
	modelYear: {
		type: Number,
		minlength: 4,
		required: true,
	},
	batteryLife: {
		type: String,
		minlength: 2,
		required: true,
	},
	connectivity: {
		type: String,
		minlength: 2,
		required: true,
	},
	compatibility: {
		type: String,
		minlength: 2,
		required: true,
	},
	buildMaterial: {
		type: String,
		minlength: 2,
		required: true,
	},
	bandSize: {
		type: String,
		minlength: 2,
		required: true,
	},
	waterResistance: {
		type: String,
		minlength: 2,
		required: true,
	},
	wirelessAndLocation: {
		type: String,
		minlength: 2,
		required: true,
	},
	specialFeatures: {
		type: String,
		minlength: 2,
		required: true,
	},
	activityTracking: {
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
			},
			_id: false,
		}
	],
	imageIds: [
		{
			imageName: {
				type: String,
				minlength: 2,
				required: true
			},
			publicId: {
				type: String,
				minlength: 2,
				required: true
			},
			_id: false,
		}
	]
})

watchSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Watch', watchSchema)