import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/thyroid';

  const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

// Request interceptor
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
// Response interceptor
api.interceptors.response.use(
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

    return Promise.reject(new Error(message));
  }
);

export const thyroidApi = {
  // POST /api/thyroid/predict
  predict: (data) => api.post('/predict', data),

  // GET /api/thyroid/history
  getHistory: () => api.get('/history'),

 // GET /api/thyroid/report-history/:id
getById: (id) => api.get(`/history/${id}`),

// DELETE /api/thyroid/report-history/:id
deleteById: (id) => api.delete(`/history/${id}`),

// GET /api/thyroid/report-ai/:id
getAIAdvice: (id) => api.get(`/ai-chat/${id}`),

// POST /api/thyroid/ai-chat/:id
chatWithAI: (id, message) =>
  api.post(`/ai-chat/${id}`, {
    message,
  }),
  addFood: (food) => api.post("/diet", food),

getTodayMeals: () => api.get("/diet/today"),

getDietHistory: () => api.get("/diet/history"),

deleteFood: (id) => api.delete(`/diet/${id}`),
  
  // POST /api/thyroid/report-analysis (multipart/form-data file upload)
  analyzeReport: async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    return await api.post(
        "/report-analysis",
        formData
    );

},
};
export default thyroidApi;
