import {createContext, useState} from "react";

export type CacheItem = {
    data: unknown;
    timestamp: number;
}

type CacheContextType = {
    cache: Record<string, CacheItem>
    setCache: (setFunc: (prevCache: Record<string, CacheItem>) => Record<string, CacheItem>) => void;
}

export const inflightRequests = new Map<string, Promise<unknown>>();

export const CacheContext = createContext<CacheContextType | null>(null);

export function CacheProvider({children}) {
    const [cache, setCache] = useState<Record<string, CacheItem>>({});

    return (
        <CacheContext.Provider value={{cache, setCache}}>
            {children}
        </CacheContext.Provider>
    )
}