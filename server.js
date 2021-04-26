const { ApolloServer, gql } = require('apollo-server')

let phones = [
	{
		name: 'Apple iPhone 12 Pro 128GB',
		description: '6.1" Super Retina Display, Triple Rear Camera, 3D LiDAR Sensor, 5G, Face ID',
		onePrice: 100,
		threePrice: 75,
		sixPrice: 60,
		twelvePrice: 50,
		brand: 'Apple',
		insideTheBox: ['Smartphone', 'Charging Cable', 'Sim card remover'],
		sim: 'Single Sim',
		memory: '6',
		battery: '2815',
		display: '6.1-Inch (SUPER RETINA OLED, 1170 x 2532 Pixels)',
		storage: '128',
		processor: 'Apple A14 Bionic',
		dimensions: '14.7 x 7.2 x 0.74 cm • 0.19 kg',
		rearCamera: '12MP + 12MP + 12MP',
		frontCamera: '12MP',
		opearatingSystem: 'iOS14',
		id: '3d599470-3436-11e9-bc57-8b80ba54c431',
		variants: [ 
			{color: 'Pacific Blue',  unitsInTheWarehouse: 10}, 
			{color: 'Silver',  unitsInTheWarehouse: 7}
		]
	}
]

const typeDefs = gql`
  type Phone {
	name: String!,
	description: String!,
	insideTheBox: [String!]!,
	prices: PhonePrices!
	brand: String!,
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

  type Query {
    allPhones: [Phone!]!
  }
`

const resolvers = {
	Query: {
		allPhones: () => phones,
	},
	Phone: {
		prices: (root) => {
			return {
				onePrice: root.onePrice,
				threePrice: root.threePrice,
				sixPrice: root.sixPrice,
				twelvePrice: root.twelvePrice,
			}
		},
		underTheHood: (root) => {
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
				opearatingSystem: root.opearatingSystem,
			}
		}
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})