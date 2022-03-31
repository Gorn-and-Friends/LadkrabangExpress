import React, { useState, useEffect } from "react";

const initialThemeState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialThemeState.theme);
  const localStorage = window.localStorage;

  useEffect(() => {
    const savedThemeLocal = localStorage.getItem("theme");

    if (!!savedThemeLocal) {
      setTheme(savedThemeLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const ThemeContext = React.createContext(initialThemeState);
export default ThemeProvider;
