// routes for joining room

import { NextRequest, NextResponse } from "next/server";
import {prisma} from  "@/lib/prisma"
import { error } from "console";


export async function POST(req:NextRequest){
    const {code ,userId} = await req.json()


    // finding the room 
    const room = await prisma.room.findUnique ({
        where :{code},
        include:{member:true},

    })

    if(!room){
        return NextResponse.json({
            error:"room not found "
        }, {status:404})
    }



// check if already a member 
    const isMember = room.members.some((m)=>m.userId === userId)




    if(!isMember){
        await prisma.roomMember.create({
            data :{
                userId,
                roomId:room.id,
                isHost:false
            }
        })
    
    }
    // return updated room info

    const updatedRoom = await prisma.room.findUnique({
        where :{code },
        include:{members:true}

    })

return NextResponse.json(updatedRoom)

}




