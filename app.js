const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const Chalk = require('chalk');
const cors = require('cors');


const graphQlSchema = require('./graphql/Schema/index');
const graphQlResolvers = require('./graphql/Resolvers/index');



const app = express();
const port = 8000;


app.use('/graphql', cors(), graphqlHttp(() => ({
  schema: schema
})));
app.listen(port);
console.log(`Started on ${Chalk.underline.blue(`http://localhost:${8000}/`)}`);
app.use(bodyParser.json());


app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);
