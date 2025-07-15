// for creating a room 
import { prisma } from "@/lib/prisma";

import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const {name, userId} = await req.json();
// generating a unique 8-character room code 
    const code = randomBytes(4).toString("hex").toUpperCase()

    const room = await prisma.room.create({
        data:{
            name,
            code,
            hostId :userId,
            members:{
                create:{
                    userId,
                    isHost: true,

                },
            },

        },
        include:{member:true}
    })
    return NextResponse.json(room)



}