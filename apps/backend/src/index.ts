import {router } from './trpc'
import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { promptRouter } from './routers/prompt'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const appRouter = router({
    prompt : promptRouter
})

const server = express()
server.use(cors({
    origin : process.env.FRONTEND_URL,
    methods : ["GET","POST"]
}))
server.use('/trpc',trpcExpress.createExpressMiddleware({
    router : appRouter
}))

server.listen(3000)

export type AppRouter = typeof appRouter