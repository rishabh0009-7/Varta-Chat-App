// connect to frontend 

const ws = new WebSocket("ws://localhost:3001");
ws.onopen = ()=>ws.send("hello from client");
ws.onmessage= (event)=>console.log("received")
