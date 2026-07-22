import { useState } from "react";
import {
  RiRobotLine,
  RiUser3Line,
  RiFileCopyLine,
  RiVolumeUpLine,
  RiCheckLine,
} from "react-icons/ri";

export default function ChatBubble({
  type = "ai",
  message,
  time,
}) {
  const [copied, setCopied] = useState(false);

  const isAI = type === "ai";

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const speakMessage = () => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1;
    utterance.pitch = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`group flex gap-3 animate-fade-in ${
        isAI ? "justify-start" : "justify-end"
      }`}
    >
      {isAI && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow">
          <RiRobotLine />
        </div>
      )}

      <div
        className={`relative max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 ${
          isAI
            ? "bg-slate-100 rounded-tl-sm"
            : "bg-teal-600 text-white rounded-tr-sm"
        }`}
      >
        <p className="text-sm leading-7 whitespace-pre-wrap">
          {message}
        </p>

        <div
          className={`text-[11px] mt-3 ${
            isAI ? "text-slate-400" : "text-teal-100"
          }`}
        >
          {time}
        </div>

        <div
  className="flex justify-end gap-2 mt-3 opacity-0 group-hover:opacity-100 transition"
>
          <button
            onClick={copyMessage}
            className="p-1 rounded hover:bg-slate-200"
            title="Copy"
          >
            {copied ? (
              <RiCheckLine className="text-emerald-600" />
            ) : (
              <RiFileCopyLine />
            )}
          </button>

          {isAI && (
            <button
              onClick={speakMessage}
              className="p-1 rounded hover:bg-slate-200"
              title="Read Aloud"
            >
              <RiVolumeUpLine />
            </button>
          )}
        </div>
      </div>

      {!isAI && (
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
          <RiUser3Line />
        </div>
      )}
    </div>
  );
}