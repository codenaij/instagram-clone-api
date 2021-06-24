import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    deleteAccount(id: String!): User!
  }
`
