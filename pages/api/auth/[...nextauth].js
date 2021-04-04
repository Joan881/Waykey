import Providers from 'next-auth/providers'
import NextAuth from 'next-auth'
import mongoose from 'mongoose'

const users = [
  {type: 'mechanic',username: 'Joan123',name: 'Joan Jeremiah',email: 'joanjeremiah04@gmail.com',password: '123',image: 'https://c.ndtvimg.com/2020-04/j200su8_ms-dhoni-afp_625x300_14_April_20.jpg'},
  {type: 'mechanic',username: 'rSanj',name: 'Sanjey R',email: 'rsanj06@gmail.com',password: 'rsanj',image: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'},
  {type: 'mechanic',username: 'raghu905',name: 'Raghu',email: 'raghukvr905@gmail.com',password: 'raghukvr',image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWzw8_87ASKSkDuQx7gbTSbjJtcxUQ7aXD9Q&usqp=CAU'}
]

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const data = users.find(user => user.username == credentials.username && user.password == credentials.password)
                if(data){
                    return data
                }
                return null
            }
        })
    ],
    callbacks: {
        jwt: async (token, user, account, profile, isNewUser) => {
          if (user) {
            delete user.password
            token.data = user
          }
          return Promise.resolve(token)
        },
        session: async (session, user) => {
          session.user = user.data
          return Promise.resolve(session)
        },
      }
})