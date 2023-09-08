import React, { createContext, useContext, useState } from 'react';

const AppStateContext = createContext();

export const useAppStateContext = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [counter, setCounter] = useState(0);
  const [tempState, setTempState] = useState(null)

  return (
    <AppStateContext.Provider
      value={{ selectedOption, setSelectedOption, counter, setCounter, tempState, setTempState }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
