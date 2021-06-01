const { gql } = require('apollo-server')

const WatchTypeDefs = gql`
	type Watch {
		watchName: String!,
		description: String!,
		brand: String!,
		insideTheBox: [String!]!,
		prices: Prices!
		watchSpecs: WatchSpecs!,
		id: ID!
		variants: [WatchVariant!]!
		imageIds: [WatchImageObj!]!
	}

	type WatchSpecs {
		type: String!
		modelYear: Int!,
		batteryLife: String!,
		connectivity: String!,
		compatibility: String!,
		buildMaterial: String!,
		bandSize: String!,
		waterResistance: String!,
		wirelessAndLocation: String!,
		specialFeatures: String!,
		activityTracking: String!,
	}

	type WatchVariant {
		color: String!,
		colorCode: String!
		unitsInTheWarehouse: Int!
	}

	type WatchImageObj {
		imageName: String!,
		publicId: String!
	}

	input WatchInput {
		watchName: String!,
		description: String!,
		brand: String!,
		insideTheBox: [String!]!,
		onePrice: Int!,
		threePrice: Int!,
		sixPrice: Int!,
		twelvePrice: Int!
		type: String!
		modelYear: Int!,
		batteryLife: String!,
		connectivity: String!,
		compatibility: String!,
		buildMaterial: String!,
		bandSize: String!,
		waterResistance: String!,
		wirelessAndLocation: String!,
		specialFeatures: String!,
		activityTracking: String!,
		variants: [WatchVariantInput!]!
		imageIds: [WatchImageObjInput!]!
	}

	input WatchVariantInput {
		color: String!,
		colorCode: String!
		unitsInTheWarehouse: Int!
	}

	input WatchImageObjInput {
		imageName: String!,
		publicId: String!
	}
`

const WatchResolvers = {
	Watch: {
		prices: (root) => {
			return {
				onePrice: root.onePrice,
				threePrice: root.threePrice,
				sixPrice: root.sixPrice,
				twelvePrice: root.twelvePrice,
			}
		},
		watchSpecs: (root) => {
			return {
				type: root.type,
				modelYear: root.modelYear,
				batteryLife: root.batteryLife,
				connectivity: root.connectivity,
				compatibility: root.compatibility,
				buildMaterial: root.buildMaterial,
				bandSize: root.bandSize,
				waterResistance: root.waterResistance,
				wirelessAndLocation: root.wirelessAndLocation,
				specialFeatures: root.specialFeatures,
				activityTracking: root.activityTracking,
			}
		}
	},
}

module.exports = { WatchTypeDefs, WatchResolvers }