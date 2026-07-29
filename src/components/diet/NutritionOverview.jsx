export default function NutritionOverview() {

  const nutrients = [
    {
      name: "Protein",
      value: 80,
      color: "bg-green-500",
    },
    {
      name: "Carbohydrates",
      value: 65,
      color: "bg-blue-500",
    },
    {
      name: "Healthy Fats",
      value: 55,
      color: "bg-yellow-500",
    },
    {
      name: "Fiber",
      value: 72,
      color: "bg-purple-500",
    },
  ];

  return (

    <div className="bg-white rounded-3xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        📈 Nutrition Overview
      </h2>

      <div className="space-y-6">

        {nutrients.map((item) => (

          <div key={item.name}>

            <div className="flex justify-between mb-2">

              <span>{item.name}</span>

              <span>{item.value}%</span>

            </div>

            <div className="w-full h-3 rounded-full bg-gray-200">

              <div
                className={`h-3 rounded-full ${item.color}`}
                style={{
                  width: `${item.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}