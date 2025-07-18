import { WebSocket, WebSocketServer } from "ws";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();
const wss = new WebSocketServer({ port: 3001 }); // Add port here

type ClientInfo = {
  ws: WebSocket;
  userId: string;
  room: string;
};

const clients: ClientInfo[] = [];

wss.on("connection", (ws) => {
  let currentUser: ClientInfo | null = null;

  ws.on("message", async (data) => {
    try {
      const msg = JSON.parse(data.toString());

      // Joining a room
      if (msg.type === "join") {
        currentUser = { ws, userId: msg.userId, room: msg.room };
        clients.push(currentUser);

        // Send chat history
        const messages = await prisma.message.findMany({
          where: { room: { code: msg.room } },
          orderBy: { createdAt: "asc" },
          include: { user: true },
        });

        ws.send(JSON.stringify({ type: "history", messages }));

        // Notify others in the room
        broadcastToRoom(msg.room, {
          type: "user-joined",
          userId: msg.userId,
        }, ws);
      }

      // Sending a message
      if (msg.type === "message" && currentUser) {
        const saved = await prisma.message.create({
          data: {
            room: { connect: { code: currentUser.room } },
            user: { connect: { id: currentUser.userId } },
            content: msg.content,
          },
          include: { user: true },
        });

        broadcastToRoom(currentUser.room, {
          type: "message",
          message: saved,
        });
      }

      // Typing indicator
      if (msg.type === "typing" && currentUser) {
        broadcastToRoom(currentUser.room, {
          type: "typing",
          userId: currentUser.userId,
        }, ws);
      }
    } catch (error) {
      console.error("WebSocket error:", error);
    }
  });

  ws.on("close", () => {
    if (currentUser) {
      // Remove from client list
      const idx = clients.indexOf(currentUser);
      if (idx !== -1) clients.splice(idx, 1);

      // Notify others
      broadcastToRoom(currentUser.room, {
        type: "user-left",
        userId: currentUser.userId,
      });
    }
  });
});

function broadcastToRoom(room: string, data: any, excludeWs?: WebSocket) {
  clients
    .filter((c) => c.room === room && c.ws !== excludeWs)
    .forEach((c) => {
      c.ws.send(JSON.stringify(data));
    });
}

console.log("WebSocket server running on ws://localhost:3001");
