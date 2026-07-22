import {
  RiRobotLine,
  RiDeleteBin6Line,
  RiPulseLine,
  RiCalendarLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";

export default function ChatHeader({
  record,
  onClearChat,
}) {
  if (!record) return null;

  const risk = record.riskLevel?.toLowerCase();

  const riskStyle =
    risk === "high"
      ? "bg-red-50 text-red-600 border-red-200"
      : risk === "medium"
      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4">

      {/* Top Row */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow">
            <RiRobotLine className="text-white text-xl" />
          </div>

          <div>

            <h2 className="font-bold text-slate-800 text-lg">
              AI Health Assistant
            </h2>

            <div className="flex items-center gap-2 mt-1">

              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>

              <span className="text-xs text-emerald-600 font-medium">
                Gemini Live
              </span>

            </div>

          </div>

        </div>

        <button
          onClick={onClearChat}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
        >
          <RiDeleteBin6Line />
          <span className="text-sm">Clear Chat</span>
        </button>

      </div>

      {/* Patient Card */}

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

        <div className="flex flex-wrap items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700">
            {record.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="flex-1">

            <h3 className="font-semibold text-slate-800">
              {record.name}
            </h3>

            <p className="text-sm text-slate-500">
              {record.prediction}
            </p>

          </div>

          <div
            className={`px-3 py-1 rounded-full border text-sm font-semibold ${riskStyle}`}
          >
            {record.riskLevel} Risk
          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">

          <div>

            <p className="text-slate-400">Age</p>

            <p className="font-medium">
              {record.age}
            </p>

          </div>

          <div>

            <p className="text-slate-400">Gender</p>

            <p className="font-medium">
              {record.gender}
            </p>

          </div>

          <div>

            <p className="text-slate-400 flex items-center gap-1">
              <RiPulseLine />
              Prediction
            </p>

            <p className="font-medium">
              {record.prediction}
            </p>

          </div>

          <div>

            <p className="text-slate-400 flex items-center gap-1">
              <RiCalendarLine />
              Assessment
            </p>

            <p className="font-medium">
              {record.createdAt
                ? new Date(record.createdAt).toLocaleDateString()
                : "--"}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}