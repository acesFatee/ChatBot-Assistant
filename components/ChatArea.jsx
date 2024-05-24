"use client";

import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Message from "./Message";

export default function ChatArea({ samplePrompts }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    role: "user",
    content: "",
  });

  const chatContainerRef = useRef(null);
  const sendMessageRef = useRef(null);

  

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  return (
    <div className="h-screen dark:bg-gray-700 flex flex-col">
      <section
        ref={chatContainerRef}
        className="flex-grow messages-section max-h-screen overflow-y-auto p-4 flex justify-center"
      >
        <div className="message-area w-full md:w-2/3">
          {
            <div className="first-message border-b border-base-300 bg-base-300 md:p-2">
              <OpeningMessage
                samplePrompts={samplePrompts}
                setMessages={setMessages}
                messages={messages}
                setLoading={setLoading}
              />
            </div>
          }
          <div className="messages">
            {messages?.map((m, i) => (
              <Message key={i} role={m.role} content={m.content} />
            ))}
          </div>
        </div>
       
      </section>
      <section className="input-area flex justify-center p-4 shadow-md">
        <div className="w-full md:w-2/3">
          <Input
            setMessages={setMessages}
            setLoading={setLoading}
            loading={loading}
            setMessage={setMessage}
            message={message}
            sendMessageRef={sendMessageRef}
          />
        </div>
      </section>
    </div>
  );
}

const OpeningMessage = ({
  samplePrompts,
  setMessages,
  setLoading
}) => {
  const borderColors = ["border-green-500", "border-red-500", "border-blue-500", "border-purple-500"]
  const sendMessage = async (prompt) => {
    setLoading(true);
    try {
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "loading",
        },
      ]);

      const response = await fetch("http://localhost:5000/create-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      setMessages((prev) => prev.slice(0, -1));

      if (response.ok) {
        const messageFromGPT = await response.json();
        setMessages((prev) => [...prev, messageFromGPT.result]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <div className="opening-message w-full grid place-items-center text-center space-y-4 mb-3">
      <h1 className="py-5 text-3xl font-bold leading-none tracking-tight md:text-4xl lg:text-4xl ">
        How can I help you today?
      </h1>
      <div className="grid px-5 place-items-center grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 sample-prompts">
  {samplePrompts?.map((p, i) => (
    <div
      onClick={() => sendMessage(p)}
      key={i}
      className={`prompt hover:bg-blue-50 ${borderColors[i]} rounded-3xl border-2 h-40 w-40 bg-base-300 border-dotted flex flex-col items-center justify-center px-5 hover:cursor-pointer`}
    >
      <span className="w-32 text-center">{p}</span>
    </div>
  ))}
</div>

    </div>
  );
};
