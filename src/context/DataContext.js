'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    time: "",
    salesType: ""
  });


  return (
    <DataContext.Provider value={{ data, setData, filters, setFilters}}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);