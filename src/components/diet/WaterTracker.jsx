import { useState } from "react";
import {
  RiCupLine,
  RiAddLine,
  RiSubtractLine,
} from "react-icons/ri";

export default function WaterTracker() {
  const goal = 3; // Litres
  const [water, setWater] = useState(1.5);

  const increaseWater = () => {
    if (water < goal) {
      setWater((prev) => +(prev + 0.25).toFixed(2));
    }
  };

  const decreaseWater = () => {
    if (water > 0) {
      setWater((prev) => +(prev - 0.25).toFixed(2));
    }
  };

  const progress = (water / goal) * 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
          <RiCupLine className="text-cyan-600 text-2xl" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Water Intake
          </h2>

          <p className="text-sm text-slate-500">
            Stay hydrated throughout the day.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 mb-6">

        <button
          onClick={decreaseWater}
          className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
        >
          <RiSubtractLine />
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-cyan-600">
            {water} L
          </h1>

          <p className="text-sm text-slate-500">
            Goal: {goal} L
          </p>
        </div>

        <button
          onClick={increaseWater}
          className="w-10 h-10 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 flex items-center justify-center transition"
        >
          <RiAddLine />
        </button>

      </div>

      {/* Progress Bar */}
      <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">

        <div
          className="h-full bg-cyan-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="mt-3 text-center text-sm text-slate-500">
        {Math.round(progress)}% of today's goal completed
      </div>

    </div>
  );
}