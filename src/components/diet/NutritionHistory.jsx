export default function NutritionHistory() {

  const history = [
    {
      date: "28 Jul",
      score: 91,
      calories: 1740,
    },
    {
      date: "27 Jul",
      score: 87,
      calories: 1815,
    },
    {
      date: "26 Jul",
      score: 82,
      calories: 1650,
    },
  ];

  return (

    <div className="bg-white rounded-3xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        📜 Nutrition History
      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b">

            <th className="py-3">Date</th>

            <th>Health Score</th>

            <th>Calories</th>

          </tr>

        </thead>

        <tbody>

          {history.map((day) => (

            <tr
              key={day.date}
              className="border-b"
            >

              <td className="py-4">
                {day.date}
              </td>

              <td>
                {day.score}%
              </td>

              <td>
                {day.calories} kcal
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}