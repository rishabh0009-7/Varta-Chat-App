import {WebSocket , WebSocketServer} from "ws";
import { PrismaClient } from "@prisma/client";
import { matchesGlob } from "path";


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
// sending messsage to user 
      ws.send(JSON.stringify({type :"history",messages}))

      // notify others to room 
      broadcastToRoom(msg.room , {
        type :"user-joined ",
        userId :msg.userId
      })
} 


// sending a message 
if(msg.type = "message" && currentUser){
  const saved = await prisma.message.create({
    data :{
      room:{connect:{code : currentUser.room}},
      user:{connect:{id : currentUser.userId}},
      content :msg.content,

  },
  include :{user :true },


  })

  // broadcats to room 
  broadcastToRoom (currentUser.room,{
    type:"message",
    message :saved 

  })



// typing indicator 
if(msg.type ==="typing " &&  currentUser) {
  broadcastToRoom(currentUser.room, {
    type : "typing",
    userId: currentUser.userId,

}

catch (error) {
  console.error("websocket error :", error)
  })

})





