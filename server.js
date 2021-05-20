const { ApolloServer, gql, UserInputError, makeExecutableSchema } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Phone = require('./models/phone')
const Laptop = require('./models/laptop')
const Watch = require('./models/watch')
const { PhoneTypeDefs, PhoneResolvers } = require('./phone')
const { LaptopTypeDefs, LaptopResolvers } = require('./laptop')
const { WatchTypeDefs, WatchResolvers } = require('./watch')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const MainTypeDefs = gql`
	type Query {
		allPhones: [Phone!]
		findPhone(name: String!): Phone

		allLaptops: [Laptop!]
		findLaptop(name: String!): Laptop
	}

	type Mutation {
		addWatch(input: WatchInput!): Watch!

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
		allPhones: () => Phone.find({}),
		// findPhone: async (root, args) => Phone.findOne({ name: args.name}),
		allLaptops: () => Laptop.find({}),
		// findLaptop: (root, args) => Laptop.findOne({ name: args.name}),
	},
	Mutation: {
		addWatch: async (root, args) => {
			if (await Phone.findOne({ name: args.input.name })) {
				throw new UserInputError('Name must be unique', {
					invalidArgs: args.input.name,
				})
			}
			let watch = new Watch({ ...args.input })
			try {
				await watch.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
			return watch
		},

		addPhone: async (root, args) => {
			if (await Phone.findOne({ name: args.input.name })) {
				throw new UserInputError('Name must be unique', {
					invalidArgs: args.input.name,
				})
			}
			let phone = new Phone({ ...args.input })
			try {
				await phone.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
			return phone
		},
		editPhonesQuantity: async (root, args) => {
			const phone = await Phone.findOne({ name: args.name })
			if (!phone) {
				return null
			}
			const editedPhoneVariants = phone.variants.map(variant => variant.color === args.color ? { color: variant.color, unitsInTheWarehouse: variant.unitsInTheWarehouse + args.quantity } : variant)
			phone.variants = editedPhoneVariants

			try {
				await phone.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
			return phone
		},


		addLaptop: async (root, args) => {
			if (await Laptop.findOne({ name: args.input.name })) {
				throw new UserInputError('Name must be unique', {
					invalidArgs: args.input.name,
				})
			}
			let laptop = new Laptop({ ...args.input })
			try {
				await laptop.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
			return laptop

		},
		editLaptopsQuantity: async (root, args) => {
			const laptop = await Laptop.findOne({ name: args.name })
			if (!laptop) {
				return null
			}
			const editedLaptopVariants = laptop.variants.map(variant => variant.color === args.color ? { color: variant.color, unitsInTheWarehouse: variant.unitsInTheWarehouse + args.quantity } : variant)
			laptop.variants = editedLaptopVariants

			try {
				await laptop.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
			return laptop
		},
	}
}

const schema = makeExecutableSchema({
	typeDefs: [ MainTypeDefs, PhoneTypeDefs, LaptopTypeDefs, WatchTypeDefs ],
	resolvers: [ MainResolvers, PhoneResolvers, LaptopResolvers, WatchResolvers ],
})

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})