var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
  buildSchema
} = require('graphql');
const db = require('./db.js');
const crud = require('./crud.js');
const klingonResolvers = require('./klingon_resolvers.js')

// sequelize.sync()
//   .then(() => Klingon.create({
//     petach: 'janedoe',
//     birthday: 1980
//   }))
//   .then(jane => {
//     console.log(jane.toJSON());
//   });

// Construct a schema, using GraphQL schema language
var schema = buildSchema(
`
type Crud {
  name: String!

}

type Person {
  name: String!
  dogs(name: String): [Dog]
  myFriend: Person
}

type Dog {
  name: String!
  bark(times: Int): [String]
}

input QueryArgs {
  petach: String,
  a: QueryArgs
} 

input SearchArg {
  field: String
  operator: String
  value: String
  searchArgs: [SearchArg]
}

enum OrderDir {
  ASC
  DESC
}

input OrderArg {
  field: String
  direction: OrderDir
}

input KlingonForPetach {
  petach: String  
}

input ReadArg {
  limit: Int
  offset: Int
  orderArgs: [OrderArg] 
  searchArg: SearchArg
}

type Klingon {
  petach: String!
  birthday: Int
  friend: Klingon
  myFriend: Klingon
  warriors: [Klingon]
  getWarriors(
    limit: Int
    offset: Int
    where: String
  ): [Klingon]
}

type RandomDie {
  numSides: Int!
  rollOnce: Int!
  roll(numRolls: Int!): [Int]
}

type Query {
  readCrud(searchArg: SearchArg): [Crud]!
  test(arg: String): Person
  getDie(numSides: Int): RandomDie
  getPerson(name: String): Person
  getKlingon(arg: KlingonForPetach): Klingon
  klingon(id: ID): Klingon!
  allKlingons(readArg: ReadArg): [Klingon]
}`
);

// This class implements the RandomDie GraphQL type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({
    numRolls
  }) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// This class represents a Dog
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark({
    times
  }) {
    return "Barking " + times + " times.";
  }
}

// This class represents a Person
class Person {
  constructor(name) {
    this.name = name;
  }

  dogs({
    name
  }) {
    return [new Dog(name)]
  }

  friend() {
    return new Person('Friendly Friend')
  }
}

// The root provides the top-level API endpoints
var root = {
  test: function(a1, a2, a3, a4) {
    console.log(`a1: ${Object.keys(a1)}, a2: ${JSON.stringify(a2)}, a3: ${JSON.stringify(a3)}, a4: ${JSON.stringify(a4)}`);
    return new Person('test called')
  },
  getDie: function({
    numSides
  }) {
    return new RandomDie(numSides || 6);
  },
  getPerson: function({
    name
  }) {
    return new Person(name);
  },
  getKlingon: function({arg}) {
    console.log(`argument "arg": ${JSON.stringify(arg)}, "arg.petach": ${arg.petach}`);
    return db.Klingon.find({
      where: {
        petach: arg.petach
      },
      include: [{
        all: true
      }]
    }).then(function(x) {
      return x
    });
  },
  klingon: klingonResolvers.klingonById,
  allKlingons: klingonResolvers.allKlingons
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  context: { foo: 'bar' }
}));
app.listen(4040);
console.log('Running a GraphQL API server at localhost:4040/graphql');
