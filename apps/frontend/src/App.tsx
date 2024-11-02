
import { client } from "./trpc/trpc"
import {ScrollArea} from '@/components/ui/scroll-area'
import {Card,CardContent} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import { SendIcon } from "lucide-react"
import  { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import {v4 as uuid} from 'uuid'
import { timeAgo } from "./lib/utils"
enum Sender {
  SELF,
  BOT
}
type MessageType = {
  id: string,
  sender: Sender,
  content : string,
  time : string
}
type FormType = {prompt : string}
function App() {
  const [messages,setMessages] = useState<MessageType[]>([])
  const {register,handleSubmit,reset,formState : {isSubmitting}} = useForm<FormType>()
  const scrollRef = useRef<null | HTMLDivElement>(null)
  async function onSubmit(payload : FormType){
    setMessages(p=>([...p,{content : payload.prompt,id : uuid(),sender : Sender.SELF,time : timeAgo.format(new Date()) }]))
    const res = await client.prompt.textPrompt.query(payload)
    setMessages(p=>([...p,{id:uuid(),content : res,sender : Sender.BOT,time : timeAgo.format(new Date())}]))
    reset()
   
}
return (
  <div className="flex flex-col h-screen ">
      <ScrollArea className="flex-1 p-4 h-[calc(100vh-4rem)]" ref={scrollRef}>
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === Sender.SELF ? 'justify-end' : 'justify-start'} mb-4`}>
            <Card className={`max-w-[70%] ${message.sender === Sender.SELF ? 'bg-primary text-primary-foreground' : ''}`}>
              <CardContent className="p-3">
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{message.time}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </ScrollArea>
      <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <Input placeholder="Ask Prompot" className="flex-1"
          disabled = {isSubmitting}
          autoFocus
          autoComplete="off"
          {...register("prompt",{required: true})}
          />
          <Button type="submit" size="icon" disabled = {isSubmitting}>
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </footer>
    </div>
)
}

export default App
