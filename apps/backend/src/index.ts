import {router } from './trpc/trpc'
import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { promptRouter } from './trpc/routers/prompt'
import cors from 'cors'
import dotenv from 'dotenv'
import {createContext} from './trpc/trpc'
import cookieParser from 'cookie-parser'
import {v4 as uuid} from 'uuid'
dotenv.config()
const server = express()
server.use(cookieParser())
server.use(cors({
    origin : process.env.FRONTEND_URL,
    methods : ["GET","POST"],
    credentials : true
}))
server.use((req,res,next)=>{
    let userId = req.cookies.userId as string | undefined
    if(!userId){
        let userId = uuid()
        res.cookie("userId",userId,{
            secure : true,
            sameSite: "none"
        })
        res.locals.userId = userId
    }
    else{
        res.locals.userId = userId
    }
    next()
})

const appRouter = router({
    prompt : promptRouter
})

server.use('/trpc',trpcExpress.createExpressMiddleware({
    router : appRouter,
    createContext
}))

server.listen(3000)

export type AppRouter = typeof appRouter