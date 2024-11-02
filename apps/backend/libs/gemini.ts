import {GoogleGenerativeAI} from '@google/generative-ai'
const geminiKey = process.env.GEMINI_API_KEY!
const genAI = new GoogleGenerativeAI(geminiKey)
const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"})


export async function textToText(prompt : string){
    return (await model.generateContent(prompt)).response.text()
}