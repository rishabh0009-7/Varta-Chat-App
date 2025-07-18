'use client';

import { useEffect, useRef, useState, useCallback } from "react"

type Message = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
};

type IncomingData =
  | { type: "history"; messages: Message[] }
  | { type: "message"; message: Message }
  | { type: "user-joined"; userId: string }
  | { type: "user-left"; userId: string }
  | { type: "typing"; userId: string };

export default function useChatWebsocket(roomCode: string, userId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [usersTyping, setUsersTyping] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3001");

    ws.current.onopen = () => {
      ws.current?.send(
        JSON.stringify({ type: "join", room: roomCode, userId })
      );
    };

    ws.current.onmessage = (event: MessageEvent) => {
      const data: IncomingData = JSON.parse(event.data);

      if (data.type === "history") {
        setMessages(data.messages);
      }

      if (data.type === "message") {
        setMessages((prev) => [...prev, data.message]);
      }

      if (data.type === "typing") {
        setUsersTyping((prev) =>
          prev.includes(data.userId) ? prev : [...prev, data.userId]
        );

        setTimeout(() => {
          setUsersTyping((prev) => prev.filter((id) => id !== data.userId));
        }, 2000);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [roomCode, userId]);

  const sendMessage = useCallback((content: string) => {
    ws.current?.send(JSON.stringify({ type: "message", content }));
  }, []);

  const sendTyping = useCallback(() => {
    ws.current?.send(JSON.stringify({ type: "typing", userId }));
  }, [userId]);

  return { messages, sendMessage, sendTyping, usersTyping };
}
