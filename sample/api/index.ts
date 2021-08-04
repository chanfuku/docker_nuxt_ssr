import { PrismaClient } from '@prisma/client'

import express from 'express'
const app = express()
const prisma = new PrismaClient()

app.get('/', async (req: express.Request, res: express.Response) => {
  const result = await main()
  res.json(result)
})

module.exports = {
  path: '/api',
  handler: app
}

async function main() {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: `alice+${Date.now()}@gmail.com`,
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
  return allUsers
}
