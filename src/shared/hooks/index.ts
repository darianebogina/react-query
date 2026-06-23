import {useContext, useEffect, useState} from "react";
import {CacheContext, type CacheItem, inflightRequests, subscribers} from "../context";
import {getFreshData} from "../lib";

type UseCustomQueryParams<T> = {
    queryKey: string;
    queryFn: () => Promise<T>;
    staleTime?: number;
};

export const useCustomQuery = <T>({queryKey, queryFn, staleTime}: UseCustomQueryParams<T>) => {
    const context = useContext(CacheContext);
    if (!context) {
        throw new Error("Context must not be empty");
    }

    const {cache, setCache} = context;

    const [data, setData] = useState<T | null>(() => getFreshData({cache, queryKey, staleTime}));

    useEffect(() => {
        const refetch = () => {
            console.log(queryKey)
            if (inflightRequests.has(queryKey)) {
                inflightRequests.get(queryKey)!.then(value => setData(value as T));
            } else {
                const promise = queryFn();
                inflightRequests.set(queryKey, promise);
                promise.then((value) => {
                    setData(value);
                    setCache(prev => ({
                        ...prev,
                        [queryKey]: {data: value, timestamp: Date.now()},
                    }) as Record<string, CacheItem>);
                    inflightRequests.delete(queryKey);
                });
            }
        }
        const freshData = getFreshData({cache, queryKey, staleTime});

        if (freshData) {
            setData(freshData as T);
        } else {
            refetch();
        }

        if (!subscribers.has(queryKey)) {
            subscribers.set(queryKey, new Set());
        }
        subscribers.get(queryKey)!.add(refetch);

        return () => {
            const set = subscribers.get(queryKey);
            set?.delete(refetch);
            if (set && set.size === 0) {
                subscribers.delete(queryKey);
            }
        };
    }, [queryKey]);

    return {data};
};

// можно вернуть промис,который  queryFn
// можно ревалидорать ключи