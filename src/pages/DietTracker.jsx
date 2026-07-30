
import { RiRestaurant2Line,RiFireLine,RiCupLine,} 
from "react-icons/ri";
import MealCard from "../components/diet/MealCard";
import WaterTracker from "../components/diet/WaterTracker";
import CalorieTracker from "../components/diet/AddFoodModel";
import AddFoodModal from "../components/diet/AddFoodModel";
import { useEffect, useState } from "react";
import { thyroidApi } from "../services/thyroidApi";
import SummaryCard from "../components/dashboard/SummaryCard";

export default function DietTracker(){
    const [meals, setMeals] = useState({
  breakfast: [],
  lunch: [],
  snacks: [],
  dinner: [],
});

const [selectedMeal, setSelectedMeal] = useState("");
const [modalOpen, setModalOpen] = useState(false);
const openModal = (mealKey) => {
  setSelectedMeal(mealKey);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

const handleSaveFood = (food) => {
  setMeals((prev) => ({
    ...prev,
    [food.mealType]: [...prev[food.mealType], food],
  }));
};
const totalCalories = Object.values(meals)
  .flat()
  .reduce((sum, item) => sum + item.calories, 0);

    return(
         <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-8">

        <div className="flex items-center gap-2 mb-2">
          <RiRestaurant2Line className="text-2xl text-teal-600" />
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Thyroid Nutrition
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-800">
          Diet Tracker
        </h1>

        <p className="text-slate-500 mt-2">
          Track meals, water intake and calories every day.
        </p>

      </div>

      {/* Meal Cards */}
      <div className="grid lg:grid-cols-2 gap-6">

        <MealCard
          title="Breakfast"
          mealKey="breakfast"
          foods={meals.breakfast}
        />

        <MealCard
          title="Lunch"
          mealKey="lunch"
          foods={meals.lunch}
        />

        <MealCard
          title="Snacks"
          mealKey="snacks"
          foods={meals.snacks}
        />

        <MealCard
          title="Dinner"
          mealKey="dinner"
          foods={meals.dinner}
        />

      </div>

      {/* Bottom Cards */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">

        <WaterTracker />

        <SummaryCard
          icon={<RiFireLine />}
          title="Calories Consumed"
          value={totalCalories}
          subtitle="Daily Goal: 1800"
          color="#fef3c7"
        />

      </div>
<AddFoodModal
  open={modalOpen}
  mealType={selectedMeal}
  onClose={closeModal}
  onSave={handleSaveFood}
/>
    </div>
  );
}