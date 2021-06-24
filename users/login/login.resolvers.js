import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import client from '../../client'

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      // Find user with args.username
      const user = await client.user.findFirst({ where: { username } })
      if (!user) {
        return {
          ok: false,
          error: 'User not found.',
        }
      }
      // check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password)
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Incorrect Password',
        }
      }
      // Issue a token and send it to the user
      const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)
      return {
        ok: true,
        token,
      }
    },
  },
}
