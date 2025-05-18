"use client";

import * as Icons from "@/components/Icons";
import MensajeEnviado from "./MensajeEnviado";
import MensajeRecibido from "./MensajeRecibido";
import Header from "./Header";
import { useState, useEffect, useRef } from "react";
import { getMessages, sendMessageAdmin, sendMessageStudent } from "@/lib/chat";

export default function Chat({ admin, id }) {
  const [msgs, setMsgs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [newMsg, setNewMsg] = useState("");

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const fetchChat = async () => {
      const response = await getMessages(id);
      setMsgs(response);
      setLoaded(true);
    };
    fetchChat();
  }, [id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    if (admin) {
      await sendMessageAdmin(id, newMsg);
    } else {
      await sendMessageStudent(newMsg);
    }

    const updatedMessages = await getMessages(id);
    setMsgs(updatedMessages);
    setNewMsg("");
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const renderMessage = (msg) => {
    const fechaFormateada = formatDate(msg.createdAt);
    if (admin) {
      return msg.receiver === null ? (
        <MensajeRecibido
          key={msg._id}
          msg={msg.content}
          date={fechaFormateada}
        />
      ) : (
        <MensajeEnviado
          key={msg._id}
          msg={msg.content}
          date={fechaFormateada}
        />
      );
    } else {
      return msg.receiver === null ? (
        <MensajeEnviado
          key={msg._id}
          msg={msg.content}
          date={fechaFormateada}
        />
      ) : (
        <MensajeRecibido
          key={msg._id}
          msg={msg.content}
          date={fechaFormateada}
        />
      );
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      <Header />

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-6 py-4 bg-white flex flex-col gap-4"
        style={{ maxHeight: "400px" }}
      >
        {loaded && msgs.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 bg-white border-t border-blue-600 flex items-center gap-2"
      >
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 text-neutral-700 text-base font-normal font-['Montserrat'] leading-normal border rounded-md p-2 outline-none"
          placeholder="Escribe tu consulta..."
        />
        <button
          type="submit"
          className="w-8 h-8 flex items-center justify-center"
        >
          <Icons.Send />
        </button>
      </form>
    </div>
  );
}
