export default function DietProgress({
  completed,
  total,
}) {
  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">

      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-semibold">
          Today's Diet Progress
        </h2>

        <span className="font-bold text-teal-600">
          {percentage}%
        </span>
      </div>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-gray-500 mt-3">
        {completed} / {total} recommended meals completed
      </p>

    </div>
  );
}