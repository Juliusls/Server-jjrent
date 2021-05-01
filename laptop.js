const { gql } = require('apollo-server')

const LaptopTypeDefs = gql`
	type Laptop {
		name: String!,
		description: String!,
		brand: String!,
		insideTheBox: [String!]!,
		prices: PhonePrices!
		laptopSpecs: LaptopSpecs!,
		id: ID!
		variants: [LaptopVariant!]!
	}

	type LaptopVariant {
		color: String!,
		unitsInTheWarehouse: Int!
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
	
	input LaptopVariantsInput {
		color: String!,
		unitsInTheWarehouse: Int!
	}

	input LaptopInput {
		name: String!,
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
		variants: [LaptopVariantsInput!]!
	}
`

const LaptopResolvers = {
	Laptop: {
		prices: (root) => {
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