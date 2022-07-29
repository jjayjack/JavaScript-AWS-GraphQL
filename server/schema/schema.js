const graphql = require("graphql");
var _ = require("lodash");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql;

var usersData = [
	{ id: "1", name: "Dave", age: 28, profession: "Programmer" },
	{ id: "13", name: "Anna", age: 32, profession: "Scrum mMster" },
	{ id: "211", name: "Bella", age: 36, profession: "Practice Manager" },
	{ id: "19", name: "Gina", age: 29, profession: "Human Resources" },
	{ id: "150", name: "George", age: 26, profession: "Programmer" }
];
var hobbiesData = [
	{
		id: "1",
		title: "Programming",
		description: "Using computers to create cool things"
	},
	{
		id: "2",
		title: "Cooking",
		description: "Stoves and grills are cool"
	},
	{
		id: "3",
		title: "Swimming",
		description: "Water is cool"
	},
	{
		id: "4",
		title: "Hiking",
		description: "Nature is cool"
	},
	{
		id: "1",
		title: "Playing with dogs",
		description: "Dogs are cool"
	}
];

var postsData = [
	{ id: "1", comment: "This is great", userId: "1" },
	{ id: "12", comment: "Awesome", userId: "211" },
	{ id: "120", comment: "WOWOWOW", userId: "1" }
];

const UserType = new GraphQLObjectType({
	name: "User",
	description: "Documentation for user",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		profession: { type: GraphQLString }
	})
});

const HobbyType = new GraphQLObjectType({
	name: "Hobby",
	description: "Hobby Description",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString }
	})
});

const PostType = new GraphQLObjectType({
	name: "Post",
	description: "Posts for users",
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return _.find(usersData, { id: parent.userId });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	description: "Description",
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },

			resolve(parent, args) {
				return _.find(usersData, {
					id: args.id
				});
			}
		},
		hobby: {
			type: HobbyType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				//return data for hobby
				return _.find(hobbiesData, {
					id: args.id
				});
			}
		},
		post: {
			type: PostType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				return _.find(postsData, {
					id: args.id
				});
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
