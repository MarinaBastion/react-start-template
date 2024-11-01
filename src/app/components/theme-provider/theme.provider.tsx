import React, { createContext,useState, useEffect, useLayoutEffect} from "react";
import type { MouseEventHandler, ReactElement, ReactNode } from "react";
import Styles from './theme.provider.module.css';

export type Theme = "light" | "dark";
export interface ThemeContextType {
    themeName: Theme;
}

export const ThemeContext = createContext<ThemeContextType>({
    themeName : "light"
});

export interface  ThemeProviderProps {
    themeName: Theme,
    children: ReactNode;

}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({themeName,children }) => {
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeName)
       
      }, [themeName])
    
   
    return (
        <ThemeContext.Provider value={{themeName}}>            
            {children}
        </ThemeContext.Provider>
        
      );
}
