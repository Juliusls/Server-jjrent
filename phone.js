const { gql } = require('apollo-server')

const PhoneTypeDefs = gql`
	type Phone {
		phoneName: String!,
		description: String!,
		brand: String!,
		insideTheBox: [String!]!,
		phonePrices: PhonePrices!
		phoneSpecs: PhoneSpecs!,
		id: ID!
		variants: [PhoneVariant!]!
		imageIds: [PhoneImageObj!]!
	}

	type PhoneVariant {
		color: String!,
		unitsInTheWarehouse: Int!
	}

	type PhonePrices {
		onePrice: Int!,
		threePrice: Int!,
		sixPrice: Int!,
		twelvePrice: Int!
	}

	type PhoneSpecs {
		sim: String,
		memory: Int!,
		battery: Int!,
		display: String!,
		storage: Int!,
		processor: String!,
		dimensions: String!,
		rearCamera: String!,
		frontCamera: String!,
		operatingSystem: String!,
	}

	type PhoneImageObj {
		imageName: String!,
		publicId: String!
	}

	input PhoneInput {
		phoneName: String!,
		description: String!,
		brand: String!,
		insideTheBox: [String!]!,
		onePrice: Int!,
		threePrice: Int!,
		sixPrice: Int!,
		twelvePrice: Int!,
		sim: String,
		memory: Int!,
		battery: Int!,
		display: String!,
		storage: Int!,
		processor: String!,
		dimensions: String!,
		rearCamera: String!,
		frontCamera: String!,
		operatingSystem: String!,
		variants: [PhoneVariantsInput!]!
		imageIds: [PhoneImageObjInput!]!
	}

	input PhoneVariantsInput {
		color: String!,
		unitsInTheWarehouse: Int!
	}

	input PhoneImageObjInput {
		imageName: String!,
		publicId: String!
	}
`

const PhoneResolvers = {
	Phone: {
		phonePrices: (root) => {
			return {
				onePrice: root.onePrice,
				threePrice: root.threePrice,
				sixPrice: root.sixPrice,
				twelvePrice: root.twelvePrice,
			}
		},
		phoneSpecs: (root) => {
			return {
				sim: root.sim,
				memory: root.memory,
				battery: root.battery,
				display: root.display,
				storage: root.storage,
				processor: root.processor,
				dimensions: root.dimensions,
				rearCamera: root.rearCamera,
				frontCamera: root.frontCamera,
				operatingSystem: root.operatingSystem,
			}
		}
	},
}

module.exports = { PhoneTypeDefs, PhoneResolvers }