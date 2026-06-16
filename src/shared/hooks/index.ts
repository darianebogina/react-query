import {useContext, useEffect, useState} from "react";
import {CacheContext, type CacheItem} from "../context";

type UseCustomQueryParams<T> = {
    queryKey: unknown[];
    queryFn: () => Promise<T>;
    staleTime?: number;
};

export const useCustomQuery = <T>({queryKey, queryFn, staleTime}: UseCustomQueryParams<T>) => {
    const context = useContext(CacheContext);

    const {cache, setCache} = context;
    const serializedKey = JSON.stringify(queryKey);
    const [data, setData] = useState<T>((cache[serializedKey] !== undefined && (staleTime === undefined || Date.now() - cache[serializedKey].timestamp < staleTime)) ?
        cache[serializedKey]?.data : null);

    if (!context) {
        return {data: null};
    }

    useEffect(() => {
        const cachedData = cache[serializedKey];
        if (cachedData !== undefined && (staleTime === undefined || Date.now() - cachedData.timestamp < staleTime)) {
            setData(cache[serializedKey].data as T);
        } else {
            queryFn().then((value) => {
                setData(value);
                setCache(prev => ({
                    ...prev,
                    [serializedKey]: {data: value, timestamp: Date.now()},
                }) as Record<string, CacheItem>);
            });
        }
    }, [serializedKey]);

    return {data};
};

// можно вернуть промис,который  queryFn
// можно ревалидорать ключи