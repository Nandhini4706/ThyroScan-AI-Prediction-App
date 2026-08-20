import FormattedText from "../common/FormattedText";

const MealPlan = ({ mealPlan }) => {

    if (!mealPlan) return null;

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

            <h2 className="text-xl font-bold text-orange-700 mb-4">
                📅 7-Day Meal Plan
            </h2>

            <div className="whitespace-pre-line font-sans leading-8 text-gray-700">
                <FormattedText value={mealPlan} />
            </div>

        </div>
    );
};

export default MealPlan;