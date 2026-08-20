
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completedMeals, setCompletedMeals] = useState([]);
  const loadMeals = async () => {
    const data = await thyroidApi.getTodayMeals();
      
      const grouped = {
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: [],
      };
      
      (Array.isArray(data) ? data : []).forEach((food) => {
        const mealType = food.mealType === "snack" ? "snacks" : food.mealType;
        if (grouped[mealType]) grouped[mealType].push(food);
      });
      
      setMeals(grouped);
      
  };
  
  useEffect(() => {
  const loadData = async () => {

    try {
      setLoading(true);
      setError("");
      await loadMeals();
      const [plan, summary] = await Promise.all([
        thyroidApi.getTodayDietPlan(),
        thyroidApi.getDailySummary(),
      ]);
      setDietPlan(plan || null);
      setDailySummary(summary || null);
    } catch (err) {
      setError(err.message || "Unable to load today's nutrition data.");
    } finally {
      setLoading(false);
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

    await refreshTrackingData();
    closeModal();

  } catch (err) {

    setError(err.message || "Unable to add this food.");

  }
};

const handleDeleteFood = async (id) => {

  try {

    await thyroidApi.deleteFood(id);

    await refreshTrackingData();

  } catch (err) {

    setError(err.message || "Unable to delete this food.");

  }
};

const refreshTrackingData = async () => {
  const [mealData, summary] = await Promise.all([
    thyroidApi.getTodayMeals(),
    thyroidApi.getDailySummary(),
  ]);
  const grouped = { breakfast: [], lunch: [], snacks: [], dinner: [] };
  (Array.isArray(mealData) ? mealData : []).forEach((food) => {
    const mealType = food.mealType === "snack" ? "snacks" : food.mealType;
    if (grouped[mealType]) grouped[mealType].push(food);
  });
  setMeals(grouped);
  setDailySummary(summary || null);
};

const handleToggleMeal = (meal) => {
  setCompletedMeals((prev) => {
    if (prev.includes(meal)) {
      return prev.filter((item) => item !== meal);
    }

    return [...prev, meal];
  });
};

const recommendedMeals = ["breakfast", "snack", "lunch", "evening", "dinner"];
const totalMeals = dietPlan
  ? recommendedMeals.filter((meal) => dietPlan[meal]).length
  : 0;
const completedCount = completedMeals.filter((meal) => dietPlan?.[meal]).length;

const totalCalories = Object.values(meals)
  .flat()
  .reduce((sum, item) => sum + Number(item.calories || 0), 0);

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
      {loading && <div className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm">Loading today's nutrition plan...</div>}
      {!loading && error && <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">{error}</div>}
      {!loading && !error && !dietPlan && (
        <div className="rounded-2xl border border-dashed border-teal-300 bg-teal-50 p-8 text-center text-slate-700">
          <h2 className="text-xl font-semibold">No personalized diet plan yet</h2>
          <p className="mt-2">Complete a Report Analysis first to receive today's plan.</p>
        </div>
      )}

<DietProgress
    completed={completedCount}
    total={totalMeals}
/>

<RecommendedDietCard
    dietPlan={dietPlan}
    completedFoods={completedMeals}
    onToggleFood={handleToggleMeal}
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

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold text-slate-800">AI Daily Nutrition Feedback</h2>
        <AIHealthScore summary={dailySummary} />
      </section>

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