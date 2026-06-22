import type {CacheItem} from "../context";

type getFreshDataParams = {
    cache: Record<string, CacheItem>;
    serializedKey: string;
    staleTime?: number;
}

export const getFreshData = <T>({cache, serializedKey, staleTime}: getFreshDataParams) => {
    const cachedData = cache[serializedKey];
    const isFreshData = cachedData !== undefined && (staleTime === undefined || Date.now() - cachedData.timestamp < staleTime);
    return isFreshData ? cachedData.data as T : null;
}
