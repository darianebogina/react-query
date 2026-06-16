import type {NewPost, Post} from "../types";

const getPosts = (): Promise<Post[]> =>
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json());

const createPost = (newPost: NewPost): Promise<Post> =>
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
    }).then(res => res.json());

export const getApi = {
    getPosts,
    createPost,
}
