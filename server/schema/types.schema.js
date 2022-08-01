const graphql = require("graphql");

const {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLFloat,
	GraphQLSchema
} = graphql;

const Person = new GraphQLObjectType({
	name: "Person",
	description: "Represents a Person Type",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
		age: { type: GraphQLInt },
		isMarried: { type: GraphQLBoolean },
		gpa: { type: GraphQLFloat },

		justAType: {
			type: Person,
			resolve(parent, args) {
				return parent;
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	description: "Description",
	fields: {
		person: {
			type: Person,
			resolve(parent, args) {
				let personObject = {
					name: "Anthony",
					age: 27,
					isMarried: false,
					gpa: 3.75
				};
				return personObject;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
