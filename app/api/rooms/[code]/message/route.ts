// for fetching message 

import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"
import { error } from "console";

export async function GET(req:NextRequest, {params}:{params:{code:String}}){

    const {code } = params;


    // find room by code 
    const room = await prisma.room.findUnique({
        where :{code },
        select :{id:true },
       

    })

    if(!room){
        return NextResponse.json({error:"room not found "}:{status:404})
    }



    // fetching message from room 
    const messages = await prisma.message.findMany({
        where :{roomId: room.id },
        orderBy:{createdAt :"asc"},
        include :{user:true },


    })

    return NextResponse.json(messages)

}