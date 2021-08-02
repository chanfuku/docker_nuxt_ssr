import { PrismaClient } from '@prisma/client'

const express = require('express')
const app = express()
const prisma = new PrismaClient()

app.get('/', (req, res) => {
  main()
  res.json({ message: 'hello, api' })
})

module.exports = {
  path: '/api',
  handler: app
}

async function main() {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
}
