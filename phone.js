const { gql } = require('apollo-server')

const typeDefs = gql`
	type Phone {
		name: String!,
		description: String!,
		brand: String!,
		insideTheBox: [String!]!,
		prices: PhonePrices!
		underTheHood: UnderTheHood!,
		id: ID!
		variants: [Variant!]!
	}

	type Variant {
		color: String!,
		unitsInTheWarehouse: Int!
	}

	type PhonePrices {
		onePrice: Int!,
		threePrice: Int!,
		sixPrice: Int!,
		twelvePrice: Int!
	}

	type UnderTheHood {
		sim: String!,
		memory: String!,
		battery: String!,
		display: String!,
		storage: String!,
		processor: String!,
		dimensions: String!,
		rearCamera: String!,
		frontCamera: String!,
		opearatingSystem: String!,
	}
`

module.exports = { typeDefs }