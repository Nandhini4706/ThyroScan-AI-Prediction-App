export default function WeeklyProgress() {

  const week = [
    { day: "Mon", score: 90 },
    { day: "Tue", score: 80 },
    { day: "Wed", score: 65 },
    { day: "Thu", score: 100 },
    { day: "Fri", score: 75 },
    { day: "Sat", score: 50 },
    { day: "Sun", score: 85 },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        📅 Weekly Progress
      </h2>

      <div className="flex justify-between items-end h-52">

        {week.map((item) => (

          <div
            key={item.day}
            className="flex flex-col items-center"
          >

            <div
              className="w-10 rounded-t-xl bg-teal-500 transition-all"
              style={{
                height: `${item.score * 1.5}px`,
              }}
            />

            <p className="mt-3 text-sm">
              {item.day}
            </p>

          </div>

        ))}

      </div>

    </div>
  );

}