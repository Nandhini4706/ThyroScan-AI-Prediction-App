import {
  RiCheckboxCircleLine,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";

export default function RecommendedDietCard({
  dietPlan,
  completedFoods = [],
  onToggleFood,
}) {
  if (!dietPlan) {
    return null;
  }

  const meals = [
    {
      key: "breakfast",
      label: "Breakfast",
      value: dietPlan.breakfast,
      calories: dietPlan.breakfastCalories || 0,
    },
    {
      key: "snack",
      label: "Snack",
      value: dietPlan.snack,
      calories: dietPlan.snackCalories || 0,
    },
    {
      key: "lunch",
      label: "Lunch",
      value: dietPlan.lunch,
      calories: dietPlan.lunchCalories || 0,
    },
    {
      key: "evening",
      label: "Evening",
      value: dietPlan.evening,
      calories: dietPlan.eveningCalories || 0,
    },
    {
      key: "dinner",
      label: "Dinner",
      value: dietPlan.dinner,
      calories: dietPlan.dinnerCalories || 0,
    },
  ];

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-800">
          Today's Recommended Diet
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Based on your latest thyroid report analysis.
        </p>
      </div>

      <div className="space-y-4">

        {meals.map((meal) => {

          if (!meal.value) {
            return null;
          }

          const completed =
            completedFoods.includes(meal.key);

          return (
            <div
              key={meal.key}
              className={`flex items-start gap-4 rounded-xl border p-4 transition ${
                completed
                  ? "border-green-200 bg-green-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >

              {/* CHECKBOX */}

              <button
                type="button"
                onClick={() => onToggleFood(meal.key)}
                className="mt-1"
              >
                {completed ? (
                  <RiCheckboxCircleLine
                    className="text-2xl text-green-600"
                  />
                ) : (
                  <RiCheckboxBlankCircleLine
                    className="text-2xl text-slate-400"
                  />
                )}
              </button>

              {/* MEAL */}

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h3
                    className={`font-semibold ${
                      completed
                        ? "text-green-700"
                        : "text-slate-800"
                    }`}
                  >
                    {meal.label}
                  </h3>

                  {/* CALORIES */}

                  <span className="text-sm font-semibold text-orange-600">
                    {meal.calories} kcal
                  </span>

                </div>

                <p className="mt-1 text-sm text-slate-600">
                  {meal.value}
                </p>

                {completed && (
                  <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Completed
                  </span>
                )}

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}