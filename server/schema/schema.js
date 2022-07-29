const graphql = require("graphql");

const { GraphQLObjectType } = graphql;

// Create types
const userType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user",
  fields: () => ({
    id: "123",
    name: "James",
    age: 34,
  }),
});
