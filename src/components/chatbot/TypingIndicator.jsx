import { RiRobotLine } from "react-icons/ri";

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">

      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow">
        <RiRobotLine />
      </div>

      <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-5 py-4">

        <div className="flex items-center gap-1 mb-2">

          <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>

          <span
            className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></span>

          <span
            className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></span>

        </div>

        <p className="text-xs text-slate-500">
          Gemini is typing...
        </p>

      </div>

    </div>
  );
}