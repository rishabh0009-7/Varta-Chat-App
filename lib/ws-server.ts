import {WebSocket , WebSocketServer} from "ws";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()
const wss  = new WebSocketServer()

type clientInfo = {
  ws:WebSocket,
  userId:string,
  room :string

}

const clients : clientInfo[] = []

wss.on("connected", (ws)=>{
  let currentUser = clientInfo | null=null;
  ws.on("message ",  async(data )=>{
    try {
      const msg = JSON.parse(data.toString())
      // joining a room 
      if(msg == "join"){
        currentUser = {ws, userId:msg.userId , room :msg.room} 
        clients.push(currentUser)
      }


      // send chat history (prev message to user )
      const messages = await prisma.message.findMany ({
        where :{room:{code:msg.room}},
        orderBy:{createdAt: "asc"},
        inlcude:{user:true}


      })
// sndin
      ws.send(JSON.stringify({type :"history",messages}))


      





      
    } catch (error) {
      
    }

  })

})





