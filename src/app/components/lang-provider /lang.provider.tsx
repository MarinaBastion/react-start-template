import React, { createContext, useEffect } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'ru' | 'en'
export interface LangContextType {
    langName: Lang
}

export const LangContext = createContext<LangContextType>({
    langName: 'ru',
})

export interface LangProviderProps {
    langName: Lang
    children: ReactNode
}

export const LangProvider: React.FC<LangProviderProps> = ({
    langName,
    children,
}) => {
    return (
        <LangContext.Provider value={{ langName }}>
            {children}
        </LangContext.Provider>
    )
}
