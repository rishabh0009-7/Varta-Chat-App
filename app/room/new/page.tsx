"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateRoomPage() {
  const [roomName, setRoomName] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend to actually create the room
    alert(`Room "${roomName}" created!`);
    setRoomName("");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-4 text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
          Create a Room
        </h2>
        <form
          className="flex flex-col gap-4 items-center w-full mt-2"
          onSubmit={handleCreate}
        >
          <input
            type="text"
            className="w-full rounded-lg px-4 py-2 text-lg bg-black/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            maxLength={32}
            required
          />
          <button
            className="w-full rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-2 transition shadow-lg drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]"
            type="submit"
          >
            Create Room
          </button>
        </form>
        <Link
          href="/"
          className="block text-center mt-4 text-cyan-400 hover:text-cyan-200 font-medium transition"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}