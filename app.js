const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/User');

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

        type User {
          _id: ID!
          email: String!
          password: String
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
          email: String!
          password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),

    rootValue: {
      events: () => {
        Event.find()
        .then(events => {
          return events.map(event => {
            return {...event._doc, _id: event._doc, _id: event.id };
          });
        })
        .catch(err => {
          throw err;
        });
      },
      createEvent: (args) => {
      
        const event = new Event({
           title: args.eventImput.title,
           description: args.eventImput.description,
           price: +args.eventImput.price,
           date: new Date(args.eventImput.date),
           creator: '/'
        });
        let createdEvent;
        return event
        .save()
        .then(result => {
          createdEvent = { ...result._doc,_id: result._doc._id.toString() };
          return User.findById('/')
          console.log(result);
          return {...result._doc, _id: result._doc._id.toString() };
        })
        .then(user => {
          if (user) {
            throw new Error('User exists already.');
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(result => {
         return createdEvent;
      })
        .catch(err => {
          console.log(err);
          throw err;
        });
      },
      createUser: args => {
        User.findOne({email: args.userImput.email}).then(user => {
          if (user) {
            throw new Error('User exists already.')
          }
          return bcrypt
          .hash(args.userInput.password, 12)
        })
        .then(hashedPassword => {
          const user = new User({
            email: args.userInput.email,
            password: hashedPassword
          });
      return user.save();
        })
        .then(result => {
         return { ...result._doc, password: null, _id: result.id }
        })
        .catch(err => {
          throw err;
        })
    
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

 
