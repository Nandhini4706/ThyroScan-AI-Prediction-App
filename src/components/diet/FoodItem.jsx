import {
  RiDeleteBin6Line,
  RiEdit2Line,
  RiRestaurantLine,
} from "react-icons/ri";

export default function FoodItem({
  food,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-4 hover:shadow-sm transition">

      {/* Food Details */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
          <RiRestaurantLine className="text-teal-600 text-lg" />
        </div>

        <div>
          <h3 className="font-medium text-slate-800">
            {food.name}
          </h3>

          <p className="text-sm text-slate-500">
            {food.quantity} • {food.calories} kcal
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit?.(food)}
          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
          title="Edit"
        >
          <RiEdit2Line />
        </button>

        <button
          onClick={() => onDelete?.(food)}
          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
          title="Delete"
        >
          <RiDeleteBin6Line />
        </button>
      </div>

    </div>
  );
}