import { router,publicProcedure } from "../trpc"
import { textToText } from "../../libs/gemini"
import {z} from 'zod'
export const promptRouter = router({
    textPrompt : publicProcedure.input(z.object({prompt : z.string({message : "Prompt can not be empty"})})).query(({input})=>{
        return textToText(input.prompt)
    })
})