import {
  RiRobot2Line,
  RiRestaurant2Line,
} from "react-icons/ri";

export default function RecommendedDietCard({ dietPlan,  completedFoods,
  onToggleFood, }) {
  if (!dietPlan) return null;

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

        {Object.entries(dietPlan).map(([meal, foods]) => (
          <div
            key={meal}
            className="border rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">

              <RiRestaurant2Line className="text-teal-600" />

              <h3 className="font-semibold capitalize text-lg">
                {meal}
              </h3>

            </div>

            <ul className="space-y-2">
              {foods.map((food, index) => (
                <li
                key = {index} 
                className="flex items-center justify-between">

  <label className="flex items-center gap-2">

   <input
  type="checkbox"
  checked={completedFoods.includes(food.name)}
  onChange={() => onToggleFood(food.name)}
  className="w-4 h-4 accent-teal-600"
/>

    <span>{food.name}</span>

  </label>

  <span>{food.quantity}</span>

</li>
              ))}
            </ul>

          </div>
        ))}

      </div>
    </div>
  );
}