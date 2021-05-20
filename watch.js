const { gql } = require('apollo-server')

const WatchTypeDefs = gql`
	type WatchImageObj {
		imageName: String!,
		publicId: String!
	}

	type Watch {
		name: String!,
		description: String!,
		imageIds: [WatchImageObj!]!
	}

	input WatchImageObjInput {
		imageName: String!,
		publicId: String!
	}

	input WatchInput {
		name: String!,
		description: String!,
		imageIds: [WatchImageObjInput!]!
	}
`

const WatchResolvers = {
	// Watch: {
	// 	imageIds: (root) => {
	// 		return {
	// 			imageName: root.imageName,
	// 			publicId: root.publicId,
	// 		}
	// 	},
	// },
}

module.exports = { WatchTypeDefs, WatchResolvers }