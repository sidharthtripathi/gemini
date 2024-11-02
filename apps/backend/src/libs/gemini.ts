import {ChatSession, GoogleGenerativeAI} from '@google/generative-ai'
import { HashMap } from './Hashmap'
const geminiKey = process.env.GEMINI_API_KEY!
const genAI = new GoogleGenerativeAI(geminiKey)
const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"})
const chat = model.startChat({
    history : []
})
const chats = new HashMap<ChatSession>()
export async function textChat(prompt : string,userId:string){
    if(!chats.has(userId)) chats.set(userId,model.startChat({history : []}),3600)
    const res =  await chats.get(userId)?.sendMessage(prompt)!
    return res.response.text()
    
}