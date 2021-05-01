const { ApolloServer, gql, UserInputError, makeExecutableSchema } = require('apollo-server')
const { v1: uuid } = require('uuid')
const { PhoneTypeDefs, PhoneResolvers } = require('./phone')
const { LaptopTypeDefs, LaptopResolvers } = require('./laptop')

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
		operatingSystem: 'iOS14',
		id: '3d599470-3436-11e9-bc57-8b80ba54c431',
		variants: [ 
			{ color: 'Pacific Blue',  unitsInTheWarehouse: 10 }, 
			{ color: 'Silver',  unitsInTheWarehouse: 7 }
		]
	}
]

let laptops = [
	{
		name: 'Apple MacBook Air (Late 2020) Laptop - Apple M1 - 8GB - 256GB SSD - Apple Integrated 7-core GPU',
		description: '13.3", Keyboard - German',
		brand: 'Apple',
		insideTheBox: ['Laptop', 'Power adapter', 'Charging cable'],
		onePrice: 100,
		threePrice: 75,
		sixPrice: 60,
		twelvePrice: 50,
		memory: '8',
		display: '13.3 inches (2560 x 1600)',
		storage: '256GB SSD',
		graphics: 'Apple Integrated 7-core GPU',
		processor: 'Apple M1',
		dimensions: '30.41 x 21.24 x 1.61 cm • 1.29 kg',
		operatingSystem: 'macOs Big Sur',
		keyboardLanguage: 'Finnish',
		id: '3d599470-3436-11e9-bc57-8b80ba54c431',
		variants: [ 
			{ color: 'Silver',  unitsInTheWarehouse: 2 }, 
			{ color: 'Gold',  unitsInTheWarehouse: 3 },
			{ color: 'Space Grey',  unitsInTheWarehouse: 1 }
		]
	}
]

const MainTypeDefs = gql`
	type Query {
		allPhones: [Phone!]!
		findPhone(name: String!): Phone

		allLaptops: [Laptop!]!
		findLaptop(name: String!): Laptop
	}

	type Mutation {
		addPhone(input: PhoneInput): Phone
		editPhonesQuantity(
			name: String!
			color: String!
			quantity: Int!
		): Phone

		addLaptop(input: LaptopInput): Laptop
		editLaptopsQuantity(
			name: String!
			color: String!
			quantity: Int!
		): Laptop
	}
`

const MainResolvers = {
	Query: {
		allPhones: () => phones,
		findPhone: (root, args) => phones.find(p => p.name.includes(args.name)),

		allLaptops: () => laptops,
		findLaptop: (root, args) => laptops.find(p => p.name.includes(args.name))
	},
	Mutation: {
		addPhone: (root, args) => {
			if (phones.find(p => p.name === args.input.name)) {
				throw new UserInputError('Name must be unique', {
					invalidArgs: args.input.name,
				})
			}
			const phone = { ...args.input, id: uuid() }
			phones = phones.concat(phone)
			return phone
		},
		editPhonesQuantity: (root, args) => {
			const phoneToEdit = phones.find(p => p.name === args.name)
			if (!phoneToEdit) {
				return null
			}
			const editedVariants = phoneToEdit.variants.map(variant => variant.color === args.color ? { ...variant, unitsInTheWarehouse: variant.unitsInTheWarehouse + args.quantity } : variant)
			const updatedPhone = { ...phoneToEdit, variants: editedVariants }
			phones = phones.map(phone => phone.name === args.name ? updatedPhone : phone)
			return updatedPhone
		},

		addLaptop: (root, args) => {
			if (laptops.find(p => p.name === args.input.name)) {
				throw new UserInputError('Name must be unique', {
					invalidArgs: args.input.name,
				})
			}
			const laptop = { ...args.input, id: uuid() }
			laptops = laptops.concat(laptop)
			return laptop
		},

		editLaptopsQuantity: (root, args) => {
			const laptopToEdit = laptops.find(p => p.name === args.name)
			if (!laptopToEdit) {
				return null
			}
			const editedVariants = laptopToEdit.variants.map(variant => variant.color === args.color ? { ...variant, unitsInTheWarehouse: variant.unitsInTheWarehouse + args.quantity } : variant)
			const updatedLaptop = { ...laptopToEdit, variants: editedVariants }
			laptops = laptops.map(laptop => laptop.name === args.name ? updatedLaptop : laptop)
			return updatedLaptop
		},
	}
}

const schema = makeExecutableSchema({
	typeDefs: [ MainTypeDefs, PhoneTypeDefs, LaptopTypeDefs ],
	resolvers: [ MainResolvers, PhoneResolvers, LaptopResolvers ],
})

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})