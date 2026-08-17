
import { RiAddLine, RiDeleteBin6Line } from "react-icons/ri";
export default function MealCard({
  title,
  mealKey,
  foods,
  onAddFood,
  onDeleteFood,
}) {
  const mealCalories = foods.reduce(
    (sum, item) => sum + Number(item.calories),
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <button
          onClick={() => onAddFood(mealKey)}
          className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full"
        >
          <RiAddLine />
        </button>
      </div>

      {foods.length === 0 ? (
        <p className="text-gray-400">
          No food added yet.
        </p>
      ) : (
        <div className="space-y-3">

          {foods.map((food) => (
            <div
              key={food.id}
              className="border rounded-xl p-3 flex justify-between"
            >
              <div>
                <h3 className="font-medium">
                  {food.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {food.quantity}
                </p>
              </div>

             <div className="flex items-center gap-3">

  <span className="font-semibold text-teal-600">
    {food.calories} kcal
  </span>

  <button
  onClick={() => onDeleteFood( mealKey, index)}
  className="text-red-500 hover:text-red-700"
>
  <RiDeleteBin6Line />
</button>

</div>
            </div>
          ))}

          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>{mealCalories} kcal</span>
          </div>

        </div>
      )}

    </div>
  );
}