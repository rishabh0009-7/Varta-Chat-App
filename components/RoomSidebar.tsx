export default function RoomSidebar({ roomCode, userId }: { roomCode: string; userId: string }) {
    return (
      <aside className="w-64 bg-black/70 text-white p-4 flex flex-col gap-4 border-r border-gray-800">
        <div>
          <div className="font-bold text-lg">Room Code</div>
          <div className="text-2xl tracking-widest font-mono bg-gray-900 rounded p-2 mt-1">{roomCode}</div>
        </div>
        <div>
          <div className="font-bold mb-2">Members</div>
          <ul className="space-y-1">
            {/* Placeholder for now */}
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span> You</li>
          </ul>
        </div>
      </aside>
    );
  }