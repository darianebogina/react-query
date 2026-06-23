import {createContext, useState} from "react";

export type CacheItem = {
    data: unknown;
    timestamp: number;
}

type CacheContextType = {
    cache: Record<string, CacheItem>
    setCache: (setFunc: (prevCache: Record<string, CacheItem>) => Record<string, CacheItem>) => void;
}

export const CacheContext = createContext<CacheContextType | null>(null);

export function CacheProvider({children}) {
    const [cache, setCache] = useState<Record<string, CacheItem>>({});

    return (
        <CacheContext.Provider value={{cache, setCache}}>
            {children}
        </CacheContext.Provider>
    )
}

export const inflightRequests = new Map<string, Promise<unknown>>(); // для каждого кэша корректнее свой иметь, сейчас небезопасно
export const subscribers = new Map<string, Set<() => void>>();
