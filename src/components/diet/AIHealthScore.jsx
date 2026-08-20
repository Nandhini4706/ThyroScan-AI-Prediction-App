import {
  RiRobot2Line,
  RiErrorWarningLine,
} from "react-icons/ri";

export default function AIHealthScore({
  summary,
}) {
  const score = summary?.healthScore;
  const improvements = Array.isArray(summary?.improvements)
    ? summary.improvements
    : summary?.improvements
      ? [summary.improvements]
      : [];

  if (!summary) return null;
  return (
    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-lg p-6 text-white mb-6">

      <div className="flex justify-between items-center">

        <div>

          <div className="flex items-center gap-2">

            <RiRobot2Line className="text-3xl" />

            <h2 className="text-2xl font-bold">
              AI Health Score
            </h2>

          </div>

          <p className="text-teal-100 mt-2">
            Your daily nutrition feedback
          </p>

        </div>

        <div className="text-right">

          <h1 className="text-5xl font-bold">
            {score}
          </h1>

          <p>/100</p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">

        <div className="bg-white/10 rounded-xl p-4">
          <h3 className="font-semibold">Today's Analysis</h3>
          <p className="mt-2 text-teal-50">{summary.summary || "No analysis available."}</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <h3 className="font-semibold">Improvements</h3>
          {improvements.length > 0 ? improvements.map((item, index) => (
            <div className="flex items-start gap-2 mt-2" key={index}>
              <RiErrorWarningLine className="mt-0.5 shrink-0" />
              <span>{item}</span>
            </div>
          )) : <p className="mt-2 text-teal-50">No improvements available.</p>}
        </div>

      </div>

      <div className="mt-4 rounded-xl bg-white/10 p-4">
        <h3 className="font-semibold">Tomorrow's Recommendation</h3>
        <p className="mt-2 text-teal-50">{summary.tomorrowRecommendation || "No recommendation available."}</p>
      </div>

    </div>
  );
}