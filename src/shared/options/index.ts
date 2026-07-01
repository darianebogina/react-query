import {getApi} from '@shared/requests';

export const POSTS_QUERY_KEY = 'posts';

export const getPostsQueryOptions = () => ({
    queryKey: POSTS_QUERY_KEY,
    queryFn: () => getApi.getPosts(),
    staleTime: 5000,
});

export const getTestPostsQueryOptions = (test: string) => ({
    queryKey: `${POSTS_QUERY_KEY}-${test}`,
    queryFn: () => getApi.getPosts(),
});
