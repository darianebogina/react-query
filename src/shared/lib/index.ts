import type {CacheItem} from "../context";

type getFreshDataParams = {
    cache: Record<string, CacheItem>;
    queryKey: string;
    staleTime?: number;
}

export const getFreshData = <T>({cache, queryKey, staleTime}: getFreshDataParams) => {
    const cachedData = cache[queryKey];
    const isFreshData = cachedData !== undefined && (staleTime === undefined || Date.now() - cachedData.timestamp < staleTime);
    return isFreshData ? cachedData.data as T : null;
}
