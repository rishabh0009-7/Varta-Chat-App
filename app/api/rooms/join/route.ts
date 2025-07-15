// routes for joining room

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { code, userId } = await req.json();

  // Find the room by code and include current members
  const room = await prisma.room.findUnique({
    where: { code },
    include: { members: true }, 
  });

  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  // Check if already a member
  const isMember = (room.members as { userId: string }[]).some(
    (m) => m.userId === userId
  );
  

  if (!isMember) {
    await prisma.roomMember.create({
      data: {
        userId,
        roomId: room.id,
        isHost: false,
      },
    });
  }

  // Return updated room info
  const updatedRoom = await prisma.room.findUnique({
    where: { code },
    include: { members: true }, // ✅ keep naming consistent
  });

  return NextResponse.json(updatedRoom);
}
