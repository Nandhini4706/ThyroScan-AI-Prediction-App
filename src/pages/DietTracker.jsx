
import { useEffect, useState } from "react";
import { thyroidApi } from "../services/thyroidApi";
import {
  RiRestaurant2Line,
  RiFireLine, 
} from "react-icons/ri";
import MealCard from "../components/nutrition/MealCard";
import WaterTracker from "../components/diet/WaterTracker";
import AddFoodModal from "../components/diet/AddFoodModel";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecommendedDietCard from "../components/diet/RecommendedDietCard";
import DietProgress from "../components/diet/DietProgress";
import AIHealthScore from "../components/diet/AIHealthScore";


export default function DietTracker(){
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  });

  
  const [selectedMeal, setSelectedMeal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
const [dailySummary, setDailySummary] = useState(null);
  const loadMeals = async () => {
    try {
      const data = await thyroidApi.getTodayMeals();
      
      const grouped = {
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: [],
      };
      
      data.forEach((food) => {
        grouped[food.mealType].push(food);
      });
      
      setMeals(grouped);
      
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
  const loadData = async () => {

    try {

      await loadMeals();

      const plan =
        await thyroidApi.getTodayDietPlan();

      setDietPlan(plan);

      const summary =
        await thyroidApi.getDailySummary();

      setDailySummary(summary);

    } catch (err) {

      console.error(err);

    }

  };

  loadData();

  
  }, []);
  const openModal = (mealKey) => {
  setSelectedMeal(mealKey);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

const handleSaveFood = async (food) => {

  try {

    await thyroidApi.addFood({
      ...food,
      date: new Date().toISOString().split("T")[0],
    });

    await loadMeals();

    const summary =
      await thyroidApi.getDailySummary();

    setDailySummary(summary);

    closeModal();

  } catch (err) {

    console.error(err);

  }
};

const handleDeleteFood = async (id) => {

  try {

    await thyroidApi.deleteFood(id);

    await loadMeals();

    const summary =
      await thyroidApi.getDailySummary();

    setDailySummary(summary);

  } catch (err) {

    console.error(err);

  }
};

const handleToggleFood = (foodName) => {
  setCompletedFoods((prev) => {
    if (prev.includes(foodName)) {
      return prev.filter((item) => item !== foodName);
    }

    return [...prev, foodName];
  });
};


const [completedFoods, setCompletedFoods] = useState([]);

const totalFoods = dietPlan
  ? Object.values(dietPlan).filter(
      value => typeof value === "string"
    ).length
  : 0;



const completedCount = completedFoods.length;

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
      <AIHealthScore />

      {dietPlan && (
  <div className="bg-white rounded-2xl border shadow-sm p-6 mt-6">

    <RecommendedDietCard
      dietPlan={dietPlan}
    />

  </div>
)}

<DietProgress
    completed={completedCount}
    total={totalFoods}
/>

<RecommendedDietCard
    dietPlan={dietPlan}
    completedFoods={completedFoods}
    onToggleFood={handleToggleFood}
/>



      {/* Meal Cards */}
      <div className="grid lg:grid-cols-2 gap-6">


        <MealCard
  title="Breakfast"
  mealKey="breakfast"
  foods={meals.breakfast}
  onAddFood={openModal}
  onDeleteFood={handleDeleteFood}
/>

       <MealCard
  title="Lunch"
  mealKey="lunch"
  foods={meals.lunch}
  onAddFood={openModal}
  onDeleteFood={handleDeleteFood}
/>

<MealCard
  title="Snacks"
  mealKey="snacks"
  foods={meals.snacks}
  onAddFood={openModal}
  onDeleteFood={handleDeleteFood}
/>

<MealCard
  title="Dinner"
  mealKey="dinner"
  foods={meals.dinner}
  onAddFood={openModal}
  onDeleteFood={handleDeleteFood}
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