import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');
    
    useEffect(() =>{
        const loadTheme = async() =>{
            try {
                const isTheme = await AsyncStorage.getItem('theme');
                if(isTheme){
                    setTheme(isTheme);
                }
            } catch (e) {
                console.log("Error loading theme from storage :"+e);
            }
        };
        loadTheme();
    },[])

    const toggleTheme = () =>{
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        AsyncStorage.setItem('theme',newTheme);
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);
