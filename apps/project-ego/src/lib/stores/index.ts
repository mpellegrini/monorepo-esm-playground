import { writable } from 'svelte/store'
import { Auth } from '@aws-amplify/auth'

interface User {
  email: string
}

const createUserAuthStore = () => {
  const { subscribe, set } = writable<User | null>(null)

  return {
    subscribe,
    signin: async (username: string, password: string) => {
      try {
        await Auth.signIn(username, password)
      } catch (err) {
        console.error(err)
      }
    },
    signup: async (username: string, password: string) => {
      try {
        const result = await Auth.signUp({
          username: username,
          password: password,
          attributes: {
            email: username,
          },
          autoSignIn: {
            enabled: true,
          },
        })
        console.log(JSON.stringify(result))
        set({ email: username })
      } catch (error) {
        console.log('error signing up:', error)
        set(null)
      }
    },
  }
}

export const userAuthStore = createUserAuthStore()
