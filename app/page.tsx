"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function HomePage() {
  const { user } = useUser();
  const [roomCode, setRoomCode] = useState("");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-4 text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
          Varta
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Join a room or create your own to start chatting in real time!
        </p>

        {user ? (
          <>
            <UserButton />
            <form className="flex flex-col gap-2 items-center w-full mt-6">
              <input
                type="text"
                className="w-full rounded-lg px-4 py-2 text-lg bg-black/40 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                placeholder="Enter a Room"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={8}
                required
              />
              <button
                className="w-full mt-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-2 transition shadow-lg drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]"
                type="submit"
              >
                Join Room
              </button>
            </form>
            <Link
              href="/room/new"
              className="block text-center mt-4 text-cyan-400 hover:text-cyan-200 font-medium transition drop-shadow-[0_0_6px_rgba(0,255,255,0.5)]"
            >
              Create a Room
            </Link>
          </>
        ) : (
          <>
            <p className="text-white mb-2">Please sign in to continue</p>
            <div className="flex gap-4">
              <SignInButton mode="modal" />
              <SignUpButton mode="modal" />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
