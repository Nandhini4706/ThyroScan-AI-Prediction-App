import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
});


// =========================================================
// REQUEST INTERCEPTOR
// =========================================================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);


// =========================================================
// RESPONSE INTERCEPTOR
// =========================================================

api.interceptors.response.use(

    // IMPORTANT:
    // Return response.data directly
    (response) => response.data,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");

            window.location.href = "/login";
        }

        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "An unexpected error occurred";

        return Promise.reject(
            new Error(message)
        );
    }
);


// =========================================================
// THYROID API
// =========================================================

export const thyroidApi = {

    // -----------------------------------------------------
    // Thyroid prediction
    // -----------------------------------------------------

    predict: (data) =>
        api.post("/thyroid/predict", data),


    // -----------------------------------------------------
    // Thyroid history
    // -----------------------------------------------------

    getHistory: () =>
        api.get("/thyroid/history"),


    // -----------------------------------------------------
    // Get report by ID
    // -----------------------------------------------------

    getById: (id) =>
        api.get(`/thyroid/history/${id}`),


    // -----------------------------------------------------
    // Delete report
    // -----------------------------------------------------

    deleteById: (id) =>
        api.delete(`/thyroid/history/${id}`),


    // -----------------------------------------------------
    // AI advice
    // -----------------------------------------------------

    getAIAdvice: (id) =>
        api.get(`/thyroid/ai-chat/${id}`),


    // -----------------------------------------------------
    // Dashboard
    // -----------------------------------------------------

    getDashboard: () =>
        api.get("/dashboard"),


    // -----------------------------------------------------
    // REPORT HISTORY
    // Backend:
    // GET /api/history/report-history
    // -----------------------------------------------------

    getFullHistory: () =>
        api.get("/history/report-history"),


    // -----------------------------------------------------
    // AI Chat
    // -----------------------------------------------------

    chatWithAI: (id, message) =>
        api.post(
            `/thyroid/ai-chat/${id}`,
            {
                message: message,
            }
        ),


    // -----------------------------------------------------
    // ADD FOOD
    // -----------------------------------------------------

    addFood: (food) =>
        api.post("/diet", food),


    // -----------------------------------------------------
    // TODAY'S MEALS
    // -----------------------------------------------------

    getTodayMeals: () =>
        api.get("/diet/today"),


    // -----------------------------------------------------
    // TODAY'S DIET PLAN
    // -----------------------------------------------------

    getTodayDietPlan: () =>
        api.get("/diet-plan/today"),


    // -----------------------------------------------------
    // DIET HISTORY
    // -----------------------------------------------------

    getDietHistory: () =>
        api.get("/diet/history"),


    // -----------------------------------------------------
    // DELETE FOOD
    // -----------------------------------------------------

    deleteFood: (id) =>
        api.delete(`/diet/${id}`),


    // -----------------------------------------------------
    // DAILY SUMMARY
    // -----------------------------------------------------
getDailySummary: (completedMeals = []) =>
    api.get("/daily-summary", {
        params: {
            completedMeals: completedMeals.join(",")
        }
    }),


    // -----------------------------------------------------
    // REPORT ANALYSIS
    // -----------------------------------------------------

    analyzeReport: async (file) => {

        const formData = new FormData();

        formData.append("file", file);

        return await api.post(
            "/thyroid/report-analysis",
            formData
        );
    },
};


export default thyroidApi;