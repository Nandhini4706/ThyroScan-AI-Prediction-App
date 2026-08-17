export const getDietPlan = (diagnosis) => {
  switch (diagnosis?.toLowerCase()) {
    case "hypothyroidism":
      return {
        breakfast: [
          { name: "Oats", quantity: "1 Bowl" },
          { name: "Banana", quantity: "1" },
          { name: "Low Fat Milk", quantity: "200 ml" },
        ],
        lunch: [
          { name: "Brown Rice", quantity: "1 Cup" },
          { name: "Grilled Fish", quantity: "100 g" },
          { name: "Spinach", quantity: "1 Bowl" },
        ],
        snacks: [
          { name: "Apple", quantity: "1" },
          { name: "Almonds", quantity: "10" },
        ],
        dinner: [
          { name: "Vegetable Soup", quantity: "1 Bowl" },
          { name: "Chapati", quantity: "2" },
          { name: "Broccoli", quantity: "1 Cup" },
        ],
      };

    case "hyperthyroidism":
      return {
        breakfast: [
          { name: "Whole Wheat Toast", quantity: "2 Slices" },
          { name: "Egg", quantity: "2" },
        ],
        lunch: [
          { name: "Rice", quantity: "1 Cup" },
          { name: "Chicken", quantity: "100 g" },
        ],
        snacks: [
          { name: "Yogurt", quantity: "1 Cup" },
        ],
        dinner: [
          { name: "Vegetable Curry", quantity: "1 Bowl" },
          { name: "Chapati", quantity: "2" },
        ],
      };

    default:
      return {
        breakfast: [{ name: "Healthy Breakfast", quantity: "1 Serving" }],
        lunch: [{ name: "Balanced Lunch", quantity: "1 Serving" }],
        snacks: [{ name: "Fruit", quantity: "1" }],
        dinner: [{ name: "Healthy Dinner", quantity: "1 Serving" }],
      };
  }
};