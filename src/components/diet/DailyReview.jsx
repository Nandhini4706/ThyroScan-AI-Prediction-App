import { RiRobot2Line } from "react-icons/ri";

export default function DailyReview() {

  return (

    <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl text-white p-6 shadow-lg">

      <div className="flex items-center gap-3 mb-4">

        <RiRobot2Line size={32} />

        <h2 className="text-2xl font-bold">
          AI Daily Review
        </h2>

      </div>

      <p className="leading-8">

        Excellent work today! 🎉

        <br /><br />

        ✔ Meals Completed : 80%

        <br />

        ✔ Water Intake : 60%

        <br />

        ✔ Exercise : Completed

        <br /><br />

        Suggestions

        <br />

        • Eat one fruit today.

        <br />

        • Drink 2 more glasses of water.

        <br />

        • Reduce fried foods.

      </p>

    </div>

  );

}