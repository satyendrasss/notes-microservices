import api from "../utils/axios";

const AuthService = {
  register: async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (data) => {
    const response = await api.post("/auth/login", data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  },

  profile: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("token");
    }
  },
};

export default AuthService;