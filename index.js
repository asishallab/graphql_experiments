var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Mock a Database:
const db = {
  users: {
    1: {
      id: 1,
      name: 'Foo'
    },
    2: {
      id: 2,
      name: 'Bar'
    }
  },
  posts: {
    1: {
      id: 1,
      text: 'boring post one',
      user: 1
    }
  }
}

// Construct a schema, using GraphQL schema language
var schema = buildSchema(
  `type Query {
    hello: String
    user(id: ID!): User
    post(id: ID!): Post
  }
  input QueryArg {
    key: String!
    value: String!
  }
  type User {
    id: ID!
    name: String!
    posts: [Post!]
  }
  type Post {
    id: ID!
    text: String!
    user: User!
  }
`
);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  user: (args) => {
    console.log('user query called with args: ' + JSON.stringify(args));
    return db.users[args.id]
  },
  post: (args) => {
    return db.posts[args.id]
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4040);
console.log('Running a GraphQL API server at localhost:4040/graphql');
