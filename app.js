const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const schema = require("./server/schema/schema");
const testSchema = require("./server/schema/types.schema");

const app = express();
const port = process.env.PORT || 3000;

app.use(
	"/graphql",
	graphqlHTTP({
		graphiql: true,
		schema: testSchema
	})
);

mongoose
	.connect(process.env.MONGODB_URI, {
		dbName: process.env.DB_NAME,
		user: process.env.DB_USERNAME,
		pass: process.env.DB_PASSWORD
	})
	.then(() => {
		app.listen({ port: port }, () => {
			console.log("listening for requests on " + port);
		});
	})
	.catch((error) => console.log("ERROR: " + error));
