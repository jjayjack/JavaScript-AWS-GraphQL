const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

// Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// RootQuery - path that allows up to traverse through query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },

      resolve(parent, arg) {
        //we resolve with data
        //get and return data from a dataSource
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
