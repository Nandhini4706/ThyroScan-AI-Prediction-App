import { RiFireFill } from "react-icons/ri";

export default function HealthyStreak() {

  return (

    <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl text-white p-6 shadow-lg">

      <div className="flex items-center gap-4">

        <RiFireFill size={45} />

        <div>

          <h2 className="text-2xl font-bold">
            7 Day Streak 🔥
          </h2>

          <p>
            Keep eating healthy to extend your streak!
          </p>

        </div>

      </div>

    </div>

  );

}