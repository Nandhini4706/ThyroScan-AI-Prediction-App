import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({
  messages = [],
  loading = false,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="h-full px-6 py-5 space-y-5">

      {messages.length === 0 ? (

        <div className="flex items-center justify-center h-full">

          <div className="text-center max-w-md">

            <div className="text-6xl mb-5">
              🤖
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              AI Health Assistant
            </h2>

            <p className="text-slate-500 mt-3 leading-7">
              Ask anything about your thyroid assessment.
            </p>

            <div className="mt-6 text-sm text-slate-400">
              Examples:
            </div>

            <div className="mt-4 space-y-2">

              <div className="rounded-xl bg-slate-100 px-4 py-3">
                Why am I High Risk?
              </div>

              <div className="rounded-xl bg-slate-100 px-4 py-3">
                Can I exercise?
              </div>

              <div className="rounded-xl bg-slate-100 px-4 py-3">
                What foods should I avoid?
              </div>

            </div>

          </div>

        </div>

      ) : (

        messages.map((msg) => (

          <ChatBubble
            key={msg.id}
            type={msg.type}
            message={msg.message}
            time={msg.time}
          />

        ))

      )}

      {loading && <TypingIndicator />}

      <div ref={bottomRef} />

    </div>
  );
}