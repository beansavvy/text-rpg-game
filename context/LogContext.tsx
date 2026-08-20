'use client';

import React, { createContext, useState, ReactNode } from 'react';

interface LogEntry {
  timestamp: string;
  message: ReactNode;
}

interface LogContextType {
  entries: LogEntry[];
  addEntry: (message: ReactNode) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export const LogProvider = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = useState<LogEntry[]>([]);

  const addEntry = (message: ReactNode) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newEntry: LogEntry = { timestamp, message };
    setEntries((prevEntries) => {
      const updatedEntries = [newEntry, ...prevEntries];
      return updatedEntries.slice(0, 100);
    });
  };

  return (
    <LogContext.Provider value={{ entries, addEntry }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLogContext = () => {
  const context = React.useContext(LogContext);
  if (!context) {
    throw new Error('useLogContext must be used within a LogProvider');
  }
  return context;
};
