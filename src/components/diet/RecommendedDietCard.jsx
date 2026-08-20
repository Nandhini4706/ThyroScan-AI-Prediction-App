import {
  RiRobot2Line,
  RiRestaurant2Line,
} from "react-icons/ri";

export default function RecommendedDietCard({ dietPlan,  completedFoods,
  onToggleFood, }) {
  if (!dietPlan) return null;

  const mealKeys = ["breakfast", "snack", "lunch", "evening", "dinner"];
  const mealLabels = {
    breakfast: "Breakfast",
    snack: "Snack",
    lunch: "Lunch",
    evening: "Evening Snack",
    dinner: "Dinner",
  };

  const getFoods = (value) => {
    if (Array.isArray(value)) return value;
    if (value === undefined || value === null || value === "") return [];
    return [{ name: String(value), quantity: "" }];
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-teal-100 p-3 rounded-full">
          <RiRobot2Line className="text-2xl text-teal-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            AI Personalized Diet Plan
          </h2>

          <p className="text-slate-500">
            Generated from your thyroid report
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">

        {mealKeys.map((meal) => {
          const foods = getFoods(dietPlan[meal]);

          return (
          <div
            key={meal}
            className="border rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">

              <RiRestaurant2Line className="text-teal-600" />

              <div className="flex flex-1 items-center justify-between">
                <h3 className="font-semibold capitalize text-lg">
                  {mealLabels[meal]}
                </h3>
                <label className="flex items-center gap-2 text-sm text-teal-700">
                  <input
                    type="checkbox"
                    checked={completedFoods.includes(meal)}
                    onChange={() => onToggleFood(meal)}
                    className="h-4 w-4 accent-teal-600"
                  />
                  Complete
                </label>
              </div>

            </div>

            <ul className="space-y-2">
              {foods.length === 0 ? (
                <li className="text-slate-500">No recommendation available.</li>
              ) : foods.map((food, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3"
                >
                  <span>{food.name ?? food}</span>
                  <span className="text-right text-sm text-slate-500">{food.quantity}</span>

</li>
              ))}
            </ul>

          </div>
          );
        })}

      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-5">
        <InfoBlock label="Water Goal" value={dietPlan.waterGoal} />
        <InfoBlock label="Exercise" value={dietPlan.exercise} />
        <InfoBlock label="Foods To Avoid" value={dietPlan.foodsToAvoid} />
      </div>

      {dietPlan.recommendations && (
        <div className="mt-4 rounded-xl bg-teal-50 p-4">
          <h3 className="font-semibold text-teal-900">Recommendations</h3>
          <p className="mt-1 text-sm text-teal-800">{dietPlan.recommendations}</p>
        </div>
      )}
    </div>
  );
}

function InfoBlock({ label, value }) {
  if (!value) return null;

  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-500">{label}</h3>
      <p className="mt-1 text-slate-800">{Array.isArray(value) ? value.join(", ") : value}</p>
    </div>
  );
}