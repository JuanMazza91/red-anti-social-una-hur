import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext<{
  terminoBusqueda: string;
  setTerminoBusqueda: (val: string) => void;
} | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  return (
    <SearchContext.Provider value={{ terminoBusqueda, setTerminoBusqueda }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch debe usarse dentro de un SearchProvider");
  return context;
};