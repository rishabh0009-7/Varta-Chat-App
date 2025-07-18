"use client";
import useChatWebsocket from "@/hooks/useChatWebsocket";
import MessageInput from "./MessageInput";

interface ChatWindowProps {
  roomCode: string;
  userId: string;
}

export default function ChatWindow({ roomCode, userId }: ChatWindowProps) {
  const { messages, sendMessage, sendTyping, usersTyping } = useChatWebsocket(
    roomCode,
    userId
  );

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-black/60 backdrop-blur rounded-t-lg">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-center gap-2">
              <span className="font-bold text-cyan-300">{msg.user.username}:</span>
              <span className="text-white">{msg.content}</span>
              <span className="text-xs text-gray-400 ml-2">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}

        {usersTyping.length > 0 && (
          <div className="text-cyan-400 text-sm mt-2">
            {usersTyping.length === 1
              ? "Someone is typing..."
              : "Several people are typing..."}
          </div>
        )}
      </div>

      <div className="p-4 bg-black/80 rounded-b-lg">
        <MessageInput onSend={sendMessage} onTyping = {sendTyping} />
      </div>
    </div>
  );
}
