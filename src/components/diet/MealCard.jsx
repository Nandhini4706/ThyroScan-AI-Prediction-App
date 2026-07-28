import { RiAddLine } from "react-icons/ri";
import FoodItem from "./FoodItem";

export default function MealCard({
  title,
  mealKey,
  foods = [],
  onAddFood,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-slate-800">
          {title}
        </h2>

        <button
          onClick={() => onAddFood?.(mealKey)}
          className="flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg transition"
        >
          <RiAddLine className="text-lg" />
          Add Food
        </button>
      </div>

      {/* Food List */}
      {foods.length > 0 ? (
        <div className="space-y-3">
          {foods.map((food, index) => (
            <FoodItem
              key={index}
              food={food}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-400 border-2 border-dashed rounded-xl">
          No food added yet.
        </div>
      )}

    </div>
  );
}