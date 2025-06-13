import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const res = await axios.post('https://map-application-c8t5.onrender.com/api/auth/login', {
      email,
      password,
    });

    setUser(res.data.user);
    localStorage.setItem('token', res.data.token);
    navigate('/');
  };

  const register = async (name, email, password) => {
    const res = await axios.post('https://map-application-c8t5.onrender.com/api/auth/register', {
      name,
      email,
      password,
    });

    setUser(res.data.user);
    localStorage.setItem('token', res.data.token);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
