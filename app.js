const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

const events = [];

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        imput EventImput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventImput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventImput.title,
          description: args.eventImput.description,
          price: +args.eventImput.price,
          date: args.eventImput.date,
        };
        console.log(args);
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD}@reactjsprojects-g277v.mongodb.net/test?retryWrites=true&w=majority`
  ).then().catch(err=> {
    console.log(err);
  });

  app.listen(8383);
