import { useEffect, useReducer } from "react";
import axios from "axios";

const useAuth = () => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "reset":
          return {
            loading: false,
            error: null,
            user: null,
          };
        case "error":
          return {
            ...state,
            loading: false,
            error: action.error,
          };
        case "login":
        case "register":
          return {
            ...state,
            loading: true,
          };
        case "success":
          return {
            loading: false,
            error: null,
            user: action.user,
          };
        default:
          return state;
      }
    },
    {
      loading: false,
      error: null,
      user: null,
    }
  );

  const register = async (values) => {
    dispatch({ type: "register" });
    try {
      const response = await axios.post("/api/users/register", values, {
        baseURL: "http://localhost:5000",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = response;
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: "success", user: data });
    } catch (error) {
      dispatch({ type: "error", error: error.message });
    }
  };

  const login = async (values) => {
    dispatch({ type: "login" });
    try {
      const response = await axios.post("/api/users/login", values, {
        baseURL: "http://localhost:5000",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = response;
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: "success", user: data });
    } catch (error) {
      dispatch({ type: "error", error: error.message });
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: "reset" });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      dispatch({ type: "success", user });
    }
  }, []);

  return {
    ...state,
    register,
    login,
    logout,
  };
};

export default useAuth;
