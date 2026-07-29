import { RiCheckboxCircleFill } from "react-icons/ri";

export default function GoalCard() {
  const goals = [
    { title: "Complete all meals", completed: true },
    { title: "Drink 8 glasses of water", completed: false },
    { title: "Exercise for 30 minutes", completed: true },
    { title: "Avoid processed foods", completed: false },
  ];

  const completedCount = goals.filter((g) => g.completed).length;
  const progress = Math.round((completedCount / goals.length) * 100);

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">

      <h2 className="text-xl font-bold text-slate-800 mb-4">
        🎯 Today's Wellness Goals
      </h2>

      <div className="space-y-4">

        {goals.map((goal, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <span className="text-slate-700">
              {goal.title}
            </span>

            <RiCheckboxCircleFill
              className={`text-2xl ${
                goal.completed
                  ? "text-green-500"
                  : "text-gray-300"
              }`}
            />
          </div>
        ))}

      </div>

      <div className="mt-6">

        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">
            Daily Progress
          </span>

          <span className="font-semibold">
            {progress}%
          </span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full">

          <div
            className="h-3 rounded-full bg-green-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}