const graphql = require("graphql");
var _ = require("lodash");

var usersData = [
	{ id: "1", name: "Dave", age: 28, profession: "Programmer" },
	{ id: "13", name: "Anna", age: 32, profession: "Scrum mMster" },
	{ id: "211", name: "Bella", age: 36, profession: "Practice Manager" },
	{ id: "19", name: "Gina", age: 29, profession: "Human Resources" },
	{ id: "150", name: "George", age: 26, profession: "Programmer" }
];
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLBoolean
} = graphql;

const UserType = new GraphQLObjectType({
	name: "User",
	description: "Documentation for user",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		profession: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	description: "Description",
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },

			resolve(parent, arg) {
				return _.find(usersData, {
					id: this.args.id
				});
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
