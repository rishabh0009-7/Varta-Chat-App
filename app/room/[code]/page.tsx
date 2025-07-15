import RoomSidebar from "@/components/RoomSidebar";
import ChatWindow from "@/components/ChatWindow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RoomPage({ params }: { params: { code: string } }) {
  const { userId } = await auth();

  if (!userId) redirect("/");

  return (
    <div className="flex h-screen">
      <RoomSidebar roomCode={params.code} userId={userId} />
      <div className="flex-1 flex flex-col">
        <ChatWindow roomCode={params.code} userId={userId} />
      </div>
    </div>
  );
}
