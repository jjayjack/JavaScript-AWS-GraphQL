const graphql = require("graphql");
var _ = require("lodash");
const User = require("../model/user");
const Hobby = require("../model/hobby");
const Post = require("../model/post");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull
} = graphql;

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
				return Post.find({ userId: parent.id });
			}
		},
		hobbies: {
			type: new GraphQLList(HobbyType),
			resolve(parent, args) {
				return Hobby.find({ userId: parent.id });
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
			args: {
				id: { type: GraphQLString }
			},
			resolve(parent, args) {
				return User.find({ id: args.id });
			}
		}
	})
});

const PostType = new GraphQLObjectType({
	name: "Post",
	description: "Posts description",
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return User.find({ id: args.id });
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
				return User.findById(args.id);
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find({});
			}
		},
		hobby: {
			type: HobbyType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				return Hobby.findById(args.id);
			}
		},
		hobbies: {
			type: new GraphQLList(HobbyType),
			resolve(parent, args) {
				return Hobby.find({});
			}
		},
		post: {
			type: PostType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				return Post.findById(args.id);
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return Post.find({});
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
				name: { type: GraphQLNonNull(GraphQLString) },
				age: { type: GraphQLNonNull(GraphQLInt) },
				profession: { type: GraphQLString }
			},
			resolve(parent, args) {
				let user = User({
					name: args.name,
					age: args.age,
					profession: args.profession
				});
				return user.save();
			}
		},

		updateUser: {
			type: UserType,
			args: {
				id: { type: GraphQLNonNull(GraphQLString) },
				name: { type: GraphQLNonNull(GraphQLString) },
				age: { type: GraphQLNonNull(GraphQLInt) },
				profession: { type: GraphQLString }
			},
			resolve(parent, args) {
				return (updatedUser = User.findByIdAndUpdate(
					args.id,
					{
						$set: {
							name: args.name,
							age: args.age,
							profession: args.profession
						}
					},
					{ new: true }
				));
			}
		},

		removeUser: {
			type: UserType,
			args: {
				id: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let removedUser = User.findByIdAndRemove(args.id).exec();
				if (!removedUser) {
					throw new "Error"();
				}
				return removedUser;
			}
		},

		createPost: {
			type: PostType,
			args: {
				comment: { type: GraphQLNonNull(GraphQLString) },
				userId: { type: GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let post = Post({
					comment: args.comment,
					userId: args.userId
				});
				return post.save();
			}
		},
		updatePost: {
			type: PostType,
			args: {
				id: { type: GraphQLNonNull(GraphQLString) },
				comment: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				return (updatedPost = Post.findByIdAndUpdate(
					args.id,
					{
						$set: {
							comment: args.comment
						}
					},
					{ new: true }
				));
			}
		},
		removePost: {
			type: PostType,
			args: {
				id: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let removedPost = Post.findByIdAndRemove(args.id).exec();
				if (!removedPost) {
					throw new "Error"();
				}
				return removedPost;
			}
		},

		createHobby: {
			type: HobbyType,
			args: {
				title: { type: GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLNonNull(GraphQLString) },
				userId: { type: GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let hobby = Hobby({
					title: args.title,
					description: args.description,
					userId: args.userId
				});
				return hobby.save();
			}
		},
		updateHobby: {
			type: HobbyType,
			args: {
				id: { type: GraphQLNonNull(GraphQLString) },
				title: { type: GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				return (updatedHobby = Hobby.findByIdAndUpdate(
					args.id,
					{
						$set: {
							title: args.title,
							description: args.description
						}
					},
					{ new: true }
				));
			}
		},
		removeHobby: {
			type: HobbyType,
			args: {
				id: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				let removedHobby = Hobby.findByIdAndRemove(args.id).exec();
				if (!removedHobby) {
					throw new "Error"();
				}
				return removedHobby;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
