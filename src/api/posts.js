import { API } from "./API";

export const getPostById = async (postId) => {
    const { data } = await API.get(`/posts/${postId}`);
    return data;
};

export const getPosts = async () => {
    const { data } = await API.get(`/posts`);
    return data;
};

export const createNewPost = async (post) => {
    const { data } = await API.post('/posts', post);
    return data;
};