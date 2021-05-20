const mongoose = require('mongoose')

const watchSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5
	},
	description: {
		type: String,
		minlength: 5,
		required: true,
	},
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