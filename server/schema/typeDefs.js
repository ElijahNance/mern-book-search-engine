const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input bookInput {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }

    type Query {
        getSingleUser(id: ID, username: String): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(password: String!, email: String!): Auth
        saveBook(id: ID, input: bookInput): User
        removeBook(id: ID, bookId: String!): User
    }
`

module.exports = typeDefs;