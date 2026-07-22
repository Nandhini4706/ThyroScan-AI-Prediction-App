const FoodCard = ({ title, foods, type }) => {

    if (!foods) return null;

    const color =
        type === "good"
            ? "text-green-700"
            : "text-red-700";

    // Convert string to array if needed
    const foodList = Array.isArray(foods)
        ? foods
        : foods
              .split(",")
              .map(food => food.trim())
              .filter(food => food.length > 0);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

            <h2 className={`text-xl font-bold mb-4 ${color}`}>
                {title}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

                {foodList.map((food, index) => (

                    <div
                        key={index}
                        className="border rounded-lg p-4"
                    >

                        <p className="font-medium">
                            {food}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );

};

export default FoodCard;