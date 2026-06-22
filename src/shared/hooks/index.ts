import {useContext, useEffect, useState} from "react";
import {CacheContext, type CacheItem, inflightRequests} from "../context";
import {getFreshData} from "../lib";

type UseCustomQueryParams<T> = {
    queryKey: unknown[];
    queryFn: () => Promise<T>;
    staleTime?: number;
};

export const useCustomQuery = <T>({queryKey, queryFn, staleTime}: UseCustomQueryParams<T>) => {
    const context = useContext(CacheContext);
    if (!context) {
        throw new Error("Context must not be empty");
    }

    const {cache, setCache} = context;
    const serializedKey = JSON.stringify(queryKey);

    const [data, setData] = useState<T | null>(() => getFreshData({cache, serializedKey, staleTime}));

    useEffect(() => {
        const freshData = getFreshData({cache, serializedKey, staleTime});

        if (freshData) {
            setData(freshData as T);
        } else if (inflightRequests.has(serializedKey)) {
            inflightRequests.get(serializedKey)!.then(value => setData(value as T));
        } else {
            const promise = queryFn();
            inflightRequests.set(serializedKey, promise);
            promise.then((value) => {
                setData(value);
                setCache(prev => ({
                    ...prev,
                    [serializedKey]: {data: value, timestamp: Date.now()},
                }) as Record<string, CacheItem>);
                inflightRequests.delete(serializedKey);
            });
        }
    }, [serializedKey]);

    return {data};
};

// можно вернуть промис,который  queryFn
// можно ревалидорать ключи