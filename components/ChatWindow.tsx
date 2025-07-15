import MessageInput from "./MessageInput";

export default function ChatWindow({ roomCode,userId,}: {roomCode: string; userId: string;}) {
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-black/60 backdrop-blur rounded-t-lg">
        {/* Messages will go here */}
        <div className="text-center text-gray-400">
          No messages yet. Start the conversation!
        </div>
      </div>
      <div className="p-4 bg-black/80 rounded-b-lg">
        <MessageInput roomCode={roomCode} userId={userId} />
      </div>
    </div>
  );
}
