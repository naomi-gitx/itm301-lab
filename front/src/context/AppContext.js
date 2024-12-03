import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedPlaces = localStorage.getItem('places');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedPlaces) setPlaces(JSON.parse(storedPlaces));
  }, []);

  const register = (userData) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', JSON.stringify([...storedUsers, userData]));
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addPlace = (place) => {
    const newPlace = { ...place, userId: user.email };
    const newPlaces = [...places, newPlace];
    setPlaces(newPlaces);
    localStorage.setItem('places', JSON.stringify(newPlaces));
  };

  const updatePlace = (id, updatedPlace) => {
    const newPlaces = places.map(p => p.id === id ? { ...p, ...updatedPlace } : p);
    setPlaces(newPlaces);
    localStorage.setItem('places', JSON.stringify(newPlaces));
  };

  const deletePlace = (id) => {
    const newPlaces = places.filter(p => p.id !== id);
    setPlaces(newPlaces);
    localStorage.setItem('places', JSON.stringify(newPlaces));
  };

  return (
    <AppContext.Provider value={{ user, places, register, login, logout, addPlace, updatePlace, deletePlace }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
