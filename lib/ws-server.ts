import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log("WebSocket server running on ws://localhost:3001");
