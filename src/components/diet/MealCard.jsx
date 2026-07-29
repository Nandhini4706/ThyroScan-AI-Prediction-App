import {
  RiAddCircleFill,
  RiCheckboxCircleFill,
} from "react-icons/ri";

export default function MealCard({
  title,
  mealKey,
  foods,
  onAddFood,
}) {

  const calories = foods.reduce(
    (sum, food) => sum + food.calories,
    0
  );

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition-all duration-300">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            {title}
          </h2>

          <p className="text-gray-400 text-sm">
            Today's Meal
          </p>

        </div>

        <button
          onClick={() => onAddFood(mealKey)}
          className="text-teal-600 hover:scale-110 transition"
        >
          <RiAddCircleFill size={34} />
        </button>

      </div>

      {/* Food List */}

      <div className="mt-5 space-y-3">

        {foods.length === 0 ? (

          <p className="text-gray-400">
            No foods added yet.
          </p>

        ) : (

          foods.map((food, index) => (

            <div
              key={index}
              className="flex justify-between items-center bg-slate-50 rounded-xl px-4 py-3"
            >

              <div className="flex items-center gap-3">

                <RiCheckboxCircleFill className="text-green-500" />

                <div>

                  <p className="font-medium">
                    {food.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    {food.calories} kcal
                  </p>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Footer */}

      <div className="mt-6 flex justify-between">

        <span className="text-gray-500">
          Total Calories
        </span>

        <span className="font-bold text-orange-500">
          {calories} kcal
        </span>

      </div>

    </div>
  );
}