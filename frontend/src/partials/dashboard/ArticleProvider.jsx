import React, { createContext, useState } from 'react';

export const ShowNumContext = createContext();

export function ShowNumProvider({ children }) {
  const [showNum, setShowNum] = useState(0);

  return (
    <ShowNumContext.Provider value={{ showNum, setShowNum }}>
      {children}
    </ShowNumContext.Provider>
  );
}

