"use client";
import { useState } from "react";

export default function MessageInput({
  onSend,
  onTyping,
}: {
  onSend: (msg: string) => void;
  onTyping: () => void;
}) {
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // TODO: send message via WebSocket
    console.log("Sending message:", message);
    onSend(message);
    setMessage("");
  };

  return (
    <form className="flex gap-2" onSubmit={handleSend}>
      <input
        className="flex-1 rounded px-4 py-2 bg-black/40 text-white border border-gray-700 focus:outline-none"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={500}
      />
      <button className="btn btn-primary px-4 py-2 rounded" type="submit">
        Send
      </button>
    </form>
  );
}
