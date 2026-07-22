import { useState } from "react";
import {
  RiSendPlaneFill,
  RiMicLine,
} from "react-icons/ri";

export default function ChatInput({
  disabled = false,
  onSend,
}) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    onSend(text);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="border-t border-slate-100 p-4">

      <div className="flex items-end gap-3">

       <button
  className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center"
  title="Voice Input"
>
  <RiMicLine className="text-lg" />
</button>

        <textarea
          rows={1}
          disabled={disabled}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            disabled
              ? "Select an assessment first..."
              : "Ask anything about this assessment..."
          }
          className="flex-1 resize-none border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-teal-500"
        />

        <button
          disabled={disabled || !message.trim()}
          onClick={sendMessage}
          className="w-11 h-11 rounded-full bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 transition flex items-center justify-center"
        >
          <RiSendPlaneFill />
        </button>

      </div>

    </div>
  );
}