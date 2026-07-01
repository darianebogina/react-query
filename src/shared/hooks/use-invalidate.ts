import {useContext} from "react";
import {CacheContext, inflightRequests, subscribers} from "@shared/context";

export const useInvalidate = () => {
    const context = useContext(CacheContext);
    if (!context) {
        throw new Error("Context must not be empty");
    }

    const {cache, setCache} = context;

    const invalidateByKey = (prefix: string) => {
        const allKeys = Object.keys(cache);
        const invalidateKeys = allKeys.filter(key => key === prefix || key.startsWith(prefix + '-'));
        const validKeys = allKeys.filter(key => !invalidateKeys.includes(key));

        setCache(prev =>
            Object.fromEntries(
                Object.entries(prev).filter(([key]) => validKeys.includes(key))
            )
        );

        Array.from(inflightRequests.keys())
            .filter(key => invalidateKeys.includes(key))
            .forEach(key => inflightRequests.delete(key));

        invalidateKeys.forEach(key => {
            subscribers.get(key)?.forEach(refetch => refetch());
        });
    }

    return invalidateByKey;
};
