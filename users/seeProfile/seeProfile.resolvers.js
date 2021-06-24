import client from '../../client'

export default {
  Query: {
    seeProfile: (_, { username }) => {
      const user = client.user.findUnique({
        where: {
          username,
        },
      })
      return user
    },
  },
}
