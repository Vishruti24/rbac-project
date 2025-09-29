import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const roles = localStorage.getItem('userRoles');
    if (token && roles) {
      setUser({ roles: JSON.parse(roles), token });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { authToken, roles } = res.data;
      
      // Store token and roles in localStorage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userRoles', JSON.stringify(roles));
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      
      setUser({ roles, token: authToken });
      return res;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post("/api/auth/createuser", userData);
      const { authToken, roles } = res.data;
      
      // Store token and roles in localStorage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userRoles', JSON.stringify(roles));
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      
      setUser({ roles, token: authToken });
      return res;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRoles');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
