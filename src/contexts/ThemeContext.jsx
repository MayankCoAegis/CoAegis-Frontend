import { createContext, useEffect } from "react";

const ThemeContext=createContext();


export default ThemeProvider=({children})=>{
const [theme,setTheme]=useState(()=>{
    const savedTheme=localStorage.getItem("theme");
    return savedTheme||"dark";
});

// Effect to apply the theme class to the <html> element and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );


}

// 3. Create a custom hook to use the context easily
export const useTheme = () => useContext(ThemeContext);