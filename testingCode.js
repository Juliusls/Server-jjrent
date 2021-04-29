// type AuthorD {
// 	firstName: String!
// 	lastName: String!
//   }

//   input AuthorDataToAdd {
// 	firstName: String!
// 	lastName: String!
//   }

//   type Message {
// 	id: ID!
// 	content: String!
// 	author: [AuthorD!]!
//   }

//   type Mutation {
// 	createMessage(
// 		content: String
// 		author: [AuthorDataToAdd!]!
// 	): Message
//   }


//   createMessage: (root, args) => {
// 	console.log(args)
// 	console.log(args.firstName)
// 	const message = { ...args, id: uuid() }
// 	console.log(message.id)
// 	messages = messages.concat(message)
// 	return message
// }