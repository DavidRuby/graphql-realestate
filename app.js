const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

const app = express();


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
      
        const event = new Event({
           title: args.eventImput.title,
           description: args.eventImput.description,
           price: +args.eventImput.price,
           date: new Date(args.eventImput.date)
        });
        return event
        .save()
        .then(result => {
          console.log(result);
          return {...result._doc};
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
      }
    },
    graphiql: true
  })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD}@reactjsprojects-g277v.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err=> {
    console.log(err);
  });

 
