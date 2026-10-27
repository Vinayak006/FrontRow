import { Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLLMSendMessage } from "@/hooks/useSendLLMMessage";
import type { EventRead } from "@/types/event.types";
import EventCard from "../Home/components/EventCard";

interface Message {
  id: string;
  text?: string | null;
  events?: EventRead[];
  sender: "user" | "assistant";
  createdAt: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isSendingMessage, mutateSendLLMMessage } = useLLMSendMessage({
    onSuccess(res) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          sender: "assistant",
          events: res,
        },
      ]);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSendingMessage]);

  const handleSend = () => {
    const text = input.trim();

    if (!text || isSendingMessage) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: "user",
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    mutateSendLLMMessage({ message: text });
  };

  return (
    <div className="overflow-y-auto scrollbar-thin">
      <div className="space-y-4  p-4">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No messages yet. Start a conversation. Chats are temporary.
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "user" ? (
              <div
                className={`max-w-[80%] bg-primary text-primary-foreground whitespace-pre-wrap wrap-break-word rounded-2xl px-4 py-2.5 text-sm `}
              >
                {message.text}
              </div>
            ) : message.events?.length === 0 ? (
              <>No matching events found</>
            ) : (
              <div className="space-y-2">
                {message.events?.map((event) => {
                  return <EventCard event={event} showImage={false} />;
                })}
              </div>
            )}
          </div>
        ))}

        {isSendingMessage && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Thinking...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        className="flex items-end gap-2 border-t p-3"
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message..."
          rows={1}
          disabled={isSendingMessage}
          className="max-h-32 min-h-10 flex-1 resize-y rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        />

        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isSendingMessage}
          aria-label="Send message"
        >
          {isSendingMessage ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default Chat;
