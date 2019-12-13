const { buildSchema } = require('graphql');

/// Schema 

module.exports = buildSchema(`

type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int! 
}

imput EventImput {
    title: String!
    description: String!
    price: Float!
    date: String!
}

type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): Authdata!
}

type RootMutation {
    createEvent(eventInput: EventImput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)