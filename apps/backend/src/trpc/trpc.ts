import {initTRPC} from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express';
export function createContext({res} : trpcExpress.CreateExpressContextOptions){
    return {
        userId : res.locals.userId as string
    };
}
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create()
export const router = t.router
export const publicProcedure = t.procedure