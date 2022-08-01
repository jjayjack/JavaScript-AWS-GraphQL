const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./schema/schema");
const testSchema = require("./schema/types.schema");

const app = express();
const port = process.env.PORT || 4000;
app.use(
	"/graphql",
	graphqlHTTP({
		graphiql: true,
		schema: testSchema
	})
);

mongoose
	.connect(
		`mongodb+srv://${process.env.mongoUserName}:<${process.env.mongoUserPassword}>@clustergraphql.ffvmskm.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
	)
	.then(() => {
		app.listen({ port: port }, () => {
			console.log("listening for requests on " + port);
		});
	});
