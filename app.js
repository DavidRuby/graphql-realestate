const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
import express from 'express';
import graphqlHttp from 'express-graphql';


const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');


const app = express();
const port = 8000;

const schema = require('./graphql/schema/index');
const schema = require('./graphql/resolvers/index');
const Chalk = require('chalk');
const cors = require('cors');

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
