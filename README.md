# JavaScript-AWS-NestJS-GraphQL

### Schema

Blueprint that sets up types and relationships between types

### Scalar Types

Connected to GraphQL with objects:

**String**
`GraphQLString`

**Int**
`GraphQLInt`

**Float**
`GraphQLFloat`

**Boolean**
`GraphQLBoolean`

**ID**
`GraphQLID`

**NonNull**
`GraphQLNonNull (YOUR_NON_NULL_FIELD)`

### MongoDB & Database Management

**RDBMS** Relational Database Management System:
Contains a table structure which contains columns and rows. Focused on the _relationships_ within tables. Each table has a _primary key_ that refers to table.

**MongoDB**
Main benefit is use of _collections_ which contain different _documents_.

Connecting MongoDB to Application:
Creating a new JSON file with credentials we can connect online database to application. We will want to store these values in a private file to create a level of security. The file will be in JSON format as:

      {"env":
         {
            "mongoDatabase": "YOUR_DATABASE_NAME",
            "mongoUserName": "YOUR_MONGODB_USERNAME",
            "mongoUserPassword": "YOUR_MONGODB_PASSWORD"
         }
      }

### Resources

1. [NodeJS](https://nodejs.org/en/)

2. [AWS Amplify CLI](https://docs.amplify.aws/)
   Amplify configuration: - `amplify configure`

   a. region - set based on location

   b. user name (IAM user) - user management

   once confirmed - IAM Management Console will open within AWS

   [Next: Permissions]
   For this application full AdministratorAccess was selected for demonstrative purposes

   [Next: Tags]
   None added

   [Next: Review]

   [Create User]
   Download and keep up AccessKey Id & secretAccessKey

   d. accessKeyId: copy & paste value from AWS

   e. SecretAccessKey: copy & paste value from AWS

   f. Profile Name: type custom or enter for `default`
   `Successfully set up the new user`

3. [GraphQL](https://www.npmjs.com/package/graphql)

4. [Express-GraphQL](https://github.com/graphql/express-graphql)

5. [Express](https://expressjs.com/)

6. [nodemon](https://www.npmjs.com/package/nodemon)

7. [Lodash](https://lodash.com/)

8. [MongoDB](https://www.mongodb.com/)

9. [Mongoose](https://mongoosejs.com/)

10. [CORS](https://www.npmjs.com/package/cors)

11. [Heroku](https://www.heroku.com/)
    _Deploying Notes_
    Within user dashboard, create a new app and follow steps with app name and location. [Create app]

Choose which method to use for Deployment and follow the steps based on method.

Once project has completed deployment, a new file **Procfile** will need to be created. This file tells Heroku which file to execute on runtime.

Connecting MongoDB to Heroku can be found under Settings within App and Config Vars must be updated to be the same as used within application.

https://javascript-aws-nestjs-graphql.herokuapp.com/graphql

12. [GraphQL Playground](https://www.graphqlbin.com/v2/new)

13. [AWS AppSync](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/)

Create API within AWS AppSync

**Resolver**: Within AWS, bridge between schema & data sources that allows for mapping between the two. COnnection between front-end and back-end. Coded in VTL(Velocity template language).

System Overview Architecture

**Client** **->** **GraphQL** **Proxy** **->** **Database** **Storage**

_GraphQL_ _Proxy_: Component that runs the GraphQL engine for processing requests and mapping them to logical functions for data operations or triggers.

_Operation_: Query, Mutation and Subscriptions

_Action_: A notification to connected subscribers, which is the result of a mutation

_Resolver_: A function that converts the GraphQL payload to the underlying storage system protocol and executes if the caller is authorized to invoke it.

_Function_: Defines a single operation that can be used across pipeline resolvers. Functions can be reused to perform redundant logic throughout the GraphQL Proxy.
