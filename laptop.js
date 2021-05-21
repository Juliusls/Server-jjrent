const { gql } = require('apollo-server')

const LaptopTypeDefs = gql`
	type Laptop {
		laptopName: String!,
		description: String!,
		brand: String!,
		insideTheBox: [String!]!,
		laptopPrices: PhonePrices!
		laptopSpecs: LaptopSpecs!,
		id: ID!
		variants: [LaptopVariant!]!
		imageIds: [LaptopImageObj!]!
	}

	type LaptopPrices {
		onePrice: Int!,
		threePrice: Int!,
		sixPrice: Int!,
		twelvePrice: Int!
	}

	type LaptopSpecs {
		model: String,
		memory: Int!,
		display: String!,
		storage: String!,
		graphics: String!,
		processor: String!,
		dimensions: String!,
		operatingSystem: String!,
		keyboardLanguage: String!,
	}

	type LaptopVariant {
		color: String!,
		unitsInTheWarehouse: Int!
	}

	type LaptopImageObj {
		imageName: String!,
		publicId: String!
	}

	
	input LaptopVariantInput {
		color: String!,
		unitsInTheWarehouse: Int!
	}

	input LaptopImageObjInput {
		imageName: String!,
		publicId: String!
	}

	input LaptopInput {
		laptopName: String!,
		description: String!,
		brand: String!,
		insideTheBox: [String!]!,
		onePrice: Int!,
		threePrice: Int!,
		sixPrice: Int!,
		twelvePrice: Int!,
		model: String,
		memory: Int!,
		display: String!,
		storage: String!,
		graphics: String!,
		processor: String!,
		dimensions: String!,
		operatingSystem: String!,
		keyboardLanguage: String!,
		variants: [LaptopVariantInput!]!
		imageIds: [LaptopImageObjInput!]!
	}
`

const LaptopResolvers = {
	Laptop: {
		laptopPrices: (root) => {
			return {
				onePrice: root.onePrice,
				threePrice: root.threePrice,
				sixPrice: root.sixPrice,
				twelvePrice: root.twelvePrice,
			}
		},
		laptopSpecs: (root) => {
			return {
				model: root.model,
				memory: root.memory,
				display: root.display,
				storage: root.storage,
				graphics: root.graphics,
				processor: root.processor,
				dimensions: root.dimensions,
				operatingSystem: root.operatingSystem,
				keyboardLanguage: root.keyboardLanguage,
			}
		}
	}
}

module.exports = { LaptopTypeDefs, LaptopResolvers }