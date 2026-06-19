import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: localStorage.getItem('userName') || 'Guest',
    preferences: JSON.parse(localStorage.getItem('userPreferences')) || {}
  });

  const updateUser = (newData) => {
    setUser(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('userName', updated.name);
      localStorage.setItem('userPreferences', JSON.stringify(updated.preferences));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};