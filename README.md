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
