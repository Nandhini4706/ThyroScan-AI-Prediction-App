import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";

export default function AddFoodModal({
  open,
  mealType,
  onClose,
  onSave,
}) {
  const [food, setFood] = useState({
    name: "",
    quantity: "",
    calories: "",
  });

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !food.name ||
      !food.quantity ||
      !food.calories
    ) {
      return;
    }

    onSave?.({
      ...food,
      calories: Number(food.calories),
      mealType,
    });

    setFood({
      name: "",
      quantity: "",
      calories: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Add Food
            </h2>

            <p className="text-sm text-slate-500 capitalize">
              {mealType}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100"
          >
            <RiCloseLine className="text-xl" />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>
            <label className="block text-sm font-medium mb-1">
              Food Name
            </label>

            <input
              type="text"
              placeholder="Example: Oats"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              value={food.name}
              onChange={(e) =>
                setFood({
                  ...food,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Quantity
            </label>

            <input
              type="text"
              placeholder="Example: 1 Bowl"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              value={food.quantity}
              onChange={(e) =>
                setFood({
                  ...food,
                  quantity: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Calories
            </label>

            <input
              type="number"
              placeholder="Example: 180"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              value={food.calories}
              onChange={(e) =>
                setFood({
                  ...food,
                  calories: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}