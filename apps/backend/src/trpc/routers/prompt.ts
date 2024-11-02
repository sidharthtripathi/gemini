import { router,publicProcedure } from "../trpc"
import { textChat } from "../../libs/gemini"
import {z} from 'zod'
export const promptRouter = router({
    textPrompt : publicProcedure.input(z.object({prompt : z.string({message : "Prompt can not be empty"})})).query(async({input,ctx})=>{
        return (await textChat(input.prompt,ctx.userId))
    })
})