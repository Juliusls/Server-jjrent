const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')


let phones = [
	{
		name: 'Apple iPhone 12 Pro 128GB',
		description: '6.1" Super Retina Display, Triple Rear Camera, 3D LiDAR Sensor, 5G, Face ID',
		brand: 'Apple',
		insideTheBox: ['Smartphone', 'Charging Cable', 'Sim card remover'],
		onePrice: 100,
		threePrice: 75,
		sixPrice: 60,
		twelvePrice: 50,
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
  type Query {
    allPhones: [Phone!]!
	findPhone(name: String!): Phone
  }

  input VariantsInput {
	color: String!,
	unitsInTheWarehouse: Int!
  }

  type Mutation {
	addPhone(
		name: String!,
		description: String!,
		brand: String!,
		insideTheBox: [String!]!,
		onePrice: Int!,
		threePrice: Int!,
		sixPrice: Int!,
		twelvePrice: Int!,
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
		variants: [VariantsInput!]!
	): Phone
	editQuantity(
		name: String!
		color: String!
		quantity: Int!
	): Phone
  }
`

const resolvers = {
	Query: {
		allPhones: () => phones,
		findPhone: (root, args) => phones.find(p => p.name.includes(args.name))
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
	Mutation: {
		addPhone: (root, args) => {
			if (phones.find(p => p.name === args.name)) {
				throw new UserInputError('Name must be unique', {
					invalidArgs: args.name,
				})
			}
			const phone = { ...args, id: uuid() }
			phones = phones.concat(phone)
			return phone
		},
		editQuantity: (root, args) => {
			const phoneToEdit = phones.find(p => p.name === args.name)
			if (!phoneToEdit) {
				return null
			}
			const editedVariants = phoneToEdit.variants.map(variant => variant.color === args.color ? { ...variant, unitsInTheWarehouse: variant.unitsInTheWarehouse + args.quantity } : variant)
			const updatedPhone = { ...phoneToEdit, variants: editedVariants }
			phones = phones.map(phone => phone.name === args.name ? updatedPhone : phone)
			return updatedPhone
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})