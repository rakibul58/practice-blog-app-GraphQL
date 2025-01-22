const typeDefs = `#graphql

  type Query {
        me: User
        users: [User]
        posts: [Post]
  }

  type Mutation {
      signup(
            name: String!,
            email: String!,
            password: String!,
            bio: String,
      ): UserToken

      signin(
            email: String!,
            password: String!,
      ): UserToken
  }

  type UserToken {
      token: String
  }

  type Post {
        id: ID!
        title: String!
        content: String!
        author: User
        published: Boolean!
        createdAt: String!
  }

 type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post]
        createdAt: String!
 }

 type Profile {
        id: ID!
        bio: String!
        user: User!
        createdAt: String!
 }

`;

export default typeDefs;
