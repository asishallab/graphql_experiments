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
      user_id: 1
    },
    2: {
      id: 2,
      text: 'boring post two',
      user_id: 1
    },
    3: {
      id: 3,
      text: 'Most interesting post alpha',
      user_id: 2
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
    hisPosts(
      before: Cursor
      after: Cursor
      first: Int
      last: Int
      offset: Int
    ): [Post!]
  }
  type Post {
    id: ID!
    text: String!
    user_id: Int!
  }
  scalar Cursor
`
);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  user: (args, req, bar, baz) => {
    console.log('user query called with args: ' + JSON.stringify(args));
    console.log('req.query: ' + JSON.stringify(req.query));
    console.log('req.params: ' + JSON.stringify(req.params));
    console.log('req.originalUrl: ' + JSON.stringify(req.originalUrl));
    console.log('req.url: ' + JSON.stringify(req.url));
    // console.log('bar: ' + JSON.stringify(bar));
    // console.log('baz: ' + JSON.stringify(baz));
    u = db.users[args.id]
    u.postsByUserId = Object.values(db.posts).filter(function(p) {
      return p.user_id === u.id
    })
    return u
  },
  user.hisPosts (x,y,z) => {
    console.log("hisPosts called");
    return []
  }
  post: (args) => {
    return db.posts[args.id]
  }
};

var app = express();

// Just for debugging
app.use(function(req, res, next) {
  console.log("GOT REQUEST !");
  console.log('req.query: ' + JSON.stringify(req.query));
  next(); // Passing the request to the next handler in the stack.
});

// GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4040);
console.log('Running a GraphQL API server at localhost:4040/graphql');
