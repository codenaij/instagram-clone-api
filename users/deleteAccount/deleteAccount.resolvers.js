import client from '../../client'

export default {
  Mutation: {
    deleteAccount: async (_, { id }) => {
      const user = await client.user.delete({
        where: {
          id,
        },
      })
      if (!user) {
        throw new Error('User found')
      }
      return user
    },
  },
}
