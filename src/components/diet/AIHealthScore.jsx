import {
  RiRobot2Line,
  RiCheckboxCircleFill,
  RiErrorWarningLine,
} from "react-icons/ri";

export default function AIHealthScore({
  score = 92,
}) {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-lg p-6 text-white mb-6">

      <div className="flex justify-between items-center">

        <div>

          <div className="flex items-center gap-2">

            <RiRobot2Line className="text-3xl" />

            <h2 className="text-2xl font-bold">
              AI Health Score
            </h2>

          </div>

          <p className="text-teal-100 mt-2">
            Based on today's meals and thyroid condition
          </p>

        </div>

        <div className="text-right">

          <h1 className="text-5xl font-bold">
            {score}
          </h1>

          <p>/100</p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">

        <div className="bg-white/10 rounded-xl p-4">

          <div className="flex items-center gap-2">

            <RiCheckboxCircleFill />

            <span>Good Protein Intake</span>

          </div>

          <div className="flex items-center gap-2 mt-2">

            <RiCheckboxCircleFill />

            <span>Healthy Breakfast</span>

          </div>

          <div className="flex items-center gap-2 mt-2">

            <RiCheckboxCircleFill />

            <span>Water Goal Achieved</span>

          </div>

        </div>

        <div className="bg-white/10 rounded-xl p-4">

          <div className="flex items-center gap-2">

            <RiErrorWarningLine />

            <span>Increase Iron Intake</span>

          </div>

          <div className="flex items-center gap-2 mt-2">

            <RiErrorWarningLine />

            <span>More Green Vegetables</span>

          </div>

          <div className="flex items-center gap-2 mt-2">

            <RiErrorWarningLine />

            <span>Reduce Sugar</span>

          </div>

        </div>

      </div>

    </div>
  );
}