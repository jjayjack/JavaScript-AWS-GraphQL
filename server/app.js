const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const testSchema = require("./schema/types.schema");

const app = express();

app.use(
	"/graphql",
	graphqlHTTP({
		graphiql: true,
		schema: testSchema
	})
);

app.listen(4000, () => {
	console.log("listening for requests");
});
