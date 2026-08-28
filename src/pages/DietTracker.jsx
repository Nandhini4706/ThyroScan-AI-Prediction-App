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

export default function DietTracker() {

  // =========================================================
  // MEALS ACTUALLY TAKEN
  // =========================================================

  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  });


  // =========================================================
  // UI STATES
  // =========================================================

  const [selectedMeal, setSelectedMeal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [dietPlan, setDietPlan] = useState(null);
  const [dailySummary, setDailySummary] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================================================
  // TODAY'S STORAGE KEY
  // =========================================================

  const getTodayStorageKey = () => {
    return `completedMeals_${new Date().toISOString().split("T")[0]}`;
  };


  // =========================================================
  // COMPLETED RECOMMENDED MEALS
  //
  // This is loaded from localStorage.
  // Therefore reload will NOT remove checked meals.
  // =========================================================

  const [completedMeals, setCompletedMeals] = useState(() => {

    const key =
      `completedMeals_${new Date().toISOString().split("T")[0]}`;

    const saved = localStorage.getItem(key);

    return saved ? JSON.parse(saved) : [];
  });


  // =========================================================
  // GROUP ACTUAL MEALS
  // =========================================================

  const groupMeals = (data) => {

    const grouped = {
      breakfast: [],
      lunch: [],
      snacks: [],
      dinner: [],
    };

    (Array.isArray(data) ? data : []).forEach((food) => {

      const type = String(food.mealType || "")
        .trim()
        .toLowerCase();

      if (type === "breakfast") {

        grouped.breakfast.push(food);

      } else if (
        type === "snack" ||
        type === "snacks"
      ) {

        grouped.snacks.push(food);

      } else if (type === "lunch") {

        grouped.lunch.push(food);

      } else if (type === "dinner") {

        grouped.dinner.push(food);

      }

    });

    return grouped;
  };


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {

    const loadData = async () => {

      try {

        setLoading(true);
        setError("");

       const [
  mealData,
  plan,
] = await Promise.all([

  thyroidApi.getTodayMeals(),

  thyroidApi.getTodayDietPlan(),

]);


        // -----------------------------------------------------
        // ACTUAL FOOD FROM DATABASE
        // -----------------------------------------------------

        console.log(
          "TODAY MEALS FROM DATABASE:",
          mealData
        );

        const grouped = groupMeals(mealData);

        console.log(
          "GROUPED MEALS:",
          grouped
        );

        setMeals(grouped);


        // -----------------------------------------------------
        // RECOMMENDED DIET PLAN
        // -----------------------------------------------------

        console.log(
  "TODAY DIET PLAN FULL:",
  JSON.stringify(plan, null, 2)
);

        setDietPlan(plan || null);

// -----------------------------------------------------
// GET COMPLETED RECOMMENDED MEALS
// -----------------------------------------------------

const completedKey = getTodayStorageKey();

const completed =
  JSON.parse(
    localStorage.getItem(completedKey) || "[]"
  );

setCompletedMeals(completed);


// -----------------------------------------------------
// GET AI SUMMARY
// Send completed meals to backend
// -----------------------------------------------------

const summary =
  await thyroidApi.getDailySummary(completed);

setDailySummary(summary || null);

        // -----------------------------------------------------
        // AI SUMMARY
        // -----------------------------------------------------

        setDailySummary(summary || null);

      } catch (err) {

        console.error(err);

        setError(
          err.message ||
          "Unable to load today's nutrition data."
        );

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, []);


  // =========================================================
  // OPEN ADD FOOD MODAL
  // =========================================================

  const openModal = (mealKey) => {

    setSelectedMeal(mealKey);

    setModalOpen(true);

  };


  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {

    setModalOpen(false);

  };


  // =========================================================
  // REFRESH DATA
  // =========================================================

  const refreshTrackingData = async () => {

    try {

      const mealData =
  await thyroidApi.getTodayMeals();

const completedKey =
  getTodayStorageKey();

const completed =
  JSON.parse(
    localStorage.getItem(completedKey) || "[]"
  );

const summary =
  await thyroidApi.getDailySummary(
    completed
  );


      console.log(
        "REFRESH MEALS:",
        mealData
      );


      // -----------------------------------------------------
      // ACTUAL FOOD
      // -----------------------------------------------------

      const grouped =
        groupMeals(mealData);

      setMeals(grouped);


      // -----------------------------------------------------
      // AI SUMMARY
      // -----------------------------------------------------

      setDailySummary(
        summary || null
      );

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Unable to refresh nutrition data."
      );

    }

  };


  // =========================================================
  // ADD FOOD
  // =========================================================

  const handleSaveFood = async (food) => {

    try {

      await thyroidApi.addFood({

        ...food,

        date:
          new Date()
            .toISOString()
            .split("T")[0],

      });


      // Reload actual food from database
      await refreshTrackingData();

      closeModal();

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Unable to add this food."
      );

    }

  };


  // =========================================================
  // DELETE FOOD
  // =========================================================

  const handleDeleteFood = async (id) => {

    try {

      await thyroidApi.deleteFood(id);

      // Reload actual food from database
      await refreshTrackingData();

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Unable to delete this food."
      );

    }

  };


  // =========================================================
  // TOGGLE RECOMMENDED MEAL
  //
  // THIS IS THE IMPORTANT FIX
  // =========================================================
const handleToggleMeal = (meal) => {
  const key = getTodayStorageKey();

  setCompletedMeals((previous) => {
    let updated;

    if (previous.includes(meal)) {
      updated = previous.filter(
        (item) => item !== meal
      );
    } else {
      updated = [...previous, meal];
    }

    localStorage.setItem(
      key,
      JSON.stringify(updated)
    );

    return updated;
  });
};

// =========================================================
// RECOMMENDED MEALS
// =========================================================

const recommendedMeals = [
  "breakfast",
  "snack",
  "lunch",
  "evening",
  "dinner",
];

// =========================================================
// TOTAL RECOMMENDED MEALS
// =========================================================

const totalMeals = dietPlan
  ? recommendedMeals.filter(
      (meal) => dietPlan[meal]
    ).length
  : 0;

// =========================================================
// COMPLETED RECOMMENDED MEALS
// =========================================================

const completedCount = completedMeals.filter(
  (meal) => dietPlan?.[meal]
).length;

// =========================================================
// TOTAL ACTUAL CALORIES
// Calories from foods actually taken
// =========================================================

const totalCalories = Object.values(meals)
  .flat()
  .reduce(
    (sum, item) =>
      sum + Number(item.calories || 0),
    0
  );

// =========================================================
// TOTAL RECOMMENDED CALORIES
// =========================================================

const recommendedCalories = dietPlan
  ? Number(dietPlan.breakfastCalories || 0) +
    Number(dietPlan.snackCalories || 0) +
    Number(dietPlan.lunchCalories || 0) +
    Number(dietPlan.eveningCalories || 0) +
    Number(dietPlan.dinnerCalories || 0)
  : 0;

// =========================================================
// CALORIE DIFFERENCE
// =========================================================

const calorieDifference =
  totalCalories - recommendedCalories;

// =========================================================
// EXTRA / REMAINING CALORIES
// =========================================================

const extraCalories =
  calorieDifference > 0
    ? calorieDifference
    : 0;

const remainingCalories =
  calorieDifference < 0
    ? Math.abs(calorieDifference)
    : 0;
    <SummaryCard
  icon={<RiFireLine />}
  title="Calories Consumed"
  value={`${totalCalories} kcal`}
  subtitle={
    recommendedCalories > 0
      ? calorieDifference > 0
        ? `Recommended: ${recommendedCalories} kcal | Extra: +${extraCalories} kcal`
        : `Recommended: ${recommendedCalories} kcal | Remaining: ${remainingCalories} kcal`
      : "Recommended calories unavailable"
  }
  color="#fef3c7"
/>

  
return (
  <div className="max-w-7xl mx-auto px-6 py-8">

    {/* HEADER */}

    <div className="mb-8">

      <div className="flex items-center gap-2 mb-2">

        <RiRestaurant2Line
          className="text-2xl text-teal-600"
        />

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


    {/* LOADING */}

    {loading && (
      <div className="rounded-2xl bg-white p-6 text-slate-500 shadow-sm">
        Loading today's nutrition plan...
      </div>
    )}


    {/* ERROR */}

    {!loading && error && (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
        {error}
      </div>
    )}


    {/* NO DIET PLAN */}

    {!loading && !error && !dietPlan && (
      <div className="rounded-2xl border border-dashed border-teal-300 bg-teal-50 p-8 text-center text-slate-700">

        <h2 className="text-xl font-semibold">
          No personalized diet plan yet
        </h2>

        <p className="mt-2">
          Complete a Report Analysis first
          to receive today's plan.
        </p>

      </div>
    )}


    {/* DIET PROGRESS */}

    <DietProgress
      completed={completedCount}
      total={totalMeals}
    />


    {/* RECOMMENDED DIET */}

    <RecommendedDietCard
      dietPlan={dietPlan}
      completedFoods={completedMeals}
      onToggleFood={handleToggleMeal}
    />


    {/* ACTUAL MEALS */}

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


    {/* AI FEEDBACK */}

    <section className="mt-8">

      <h2 className="mb-4 text-2xl font-bold text-slate-800">
        AI Daily Nutrition Feedback
      </h2>

      <AIHealthScore
        summary={dailySummary}
      />

    </section>


    {/* WATER + CALORIES */}

    <div className="grid lg:grid-cols-2 gap-6 mt-6">

      <WaterTracker />

      <SummaryCard
        icon={<RiFireLine />}
        title="Calories Consumed"
        value={`${totalCalories} kcal`}
        subtitle={
          recommendedCalories > 0
            ? calorieDifference > 0
              ? `Recommended: ${recommendedCalories} kcal | Extra: +${extraCalories} kcal`
              : `Recommended: ${recommendedCalories} kcal | Remaining: ${remainingCalories} kcal`
            : "Recommended calories unavailable"
        }
        color="#fef3c7"
      />

    </div>


    {/* ADD FOOD MODAL */}

    <AddFoodModal
      open={modalOpen}
      mealType={selectedMeal}
      onClose={closeModal}
      onSave={handleSaveFood}
    />

  </div>
);

}