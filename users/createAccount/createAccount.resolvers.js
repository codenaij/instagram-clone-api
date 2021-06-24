import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import client from '../../client'

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // Check if username or email exists in DB
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username: username,
              },
              {
                email: email,
              },
            ],
          },
        })
        if (existingUser) {
          throw new Error('Username or Email already exists')
        }
        // Hash password
        const encryptedPassword = await bcrypt.hash(password, 10)
        // Save and return the user
        return client.user.create({
          data: {
            id: nanoid(),
            username,
            email,
            firstName,
            lastName,
            password: encryptedPassword,
          },
        })
      } catch (e) {
        return e
      }
    },
  },
}
