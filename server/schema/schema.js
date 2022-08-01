const graphql = require("graphql");
var _ = require("lodash");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList
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
		description: "Using computers to create cool things",
		userId: "19"
	},
	{
		id: "2",
		title: "Cooking",
		description: "Stoves and grills are cool",
		userId: "211"
	},
	{
		id: "3",
		title: "Swimming",
		description: "Water is cool",
		userId: "13"
	},
	{
		id: "4",
		title: "Hiking",
		description: "Nature is cool",
		userId: "1"
	},
	{
		id: "1",
		title: "Playing with dogs",
		description: "Dogs are cool",
		userId: "19"
	}
];

var postsData = [
	{ id: "1", comment: "This is great", userId: "1" },
	{ id: "12", comment: "Awesome", userId: "211" },
	{ id: "120", comment: "WOWOWOW", userId: "1" },
	{ id: "64", comment: "My trip at the lake!", userId: "19" }
];

const UserType = new GraphQLObjectType({
	name: "User",
	description: "Documentation for user",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		profession: { type: GraphQLString },
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return _.filter(postsData, {
					userId: parent.id
				});
			}
		},
		hobbies: {
			type: new GraphQLList(HobbyType),
			resolve(parent, args) {
				return _.filter(hobbiesData, {
					userId: parent.id
				});
			}
		}
	})
});

const HobbyType = new GraphQLObjectType({
	name: "Hobby",
	description: "Hobby Description",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return _.find(usersData, { id: parent.userId });
			}
		}
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

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		createUser: {
			type: UserType,
			args: {
				// id: {
				// 	type: GraphQLID
				// },
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
				profession: { type: GraphQLString }
			},
			resolve(parent, args) {
				let user = {
					name: args.name,
					age: args.age,
					profession: args.profession
				};
				return user;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
