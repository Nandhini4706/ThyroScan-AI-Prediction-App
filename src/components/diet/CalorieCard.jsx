import { RiFireLine } from "react-icons/ri";

export default function CalorieCard({
  consumed = 940,
  goal = 1800,
}) {
  const progress = Math.min((consumed / goal) * 100, 100);

  const getStatus = () => {
    if (consumed < goal * 0.6)
      return {
        text: "You can still consume more healthy calories.",
        color: "text-blue-600",
      };

    if (consumed <= goal)
      return {
        text: "Great! You're within your daily calorie goal.",
        color: "text-emerald-600",
      };

    return {
      text: "Daily calorie goal exceeded.",
      color: "text-red-600",
    };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
          <RiFireLine className="text-orange-600 text-2xl" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Calories
          </h2>

          <p className="text-sm text-slate-500">
            Daily calorie summary
          </p>
        </div>

      </div>

      {/* Calories */}
      <div className="text-center mb-6">

        <h1 className="text-4xl font-bold text-orange-600">
          {consumed}
        </h1>

        <p className="text-slate-500">
          / {goal} kcal
        </p>

      </div>

      {/* Progress */}
      <div className="w-full h-4 rounded-full bg-slate-200 overflow-hidden mb-4">

        <div
          className="h-full bg-orange-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* Status */}
      <div className={`text-center text-sm font-medium ${status.color}`}>
        {status.text}
      </div>

    </div>
  );
}