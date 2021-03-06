import { useEffect, useState } from "react";
import { getPostById } from "../api/posts";
import { Spinner } from "react-bootstrap"

export default function Post({ postId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPostById(postId);
                setPost(data);
            } catch (error) {
                setError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [postId]);

    if (isLoading) {
        return (
            <div className="d-flex">
                Loading <Spinner animation="grow" variant="success" /> Post...
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                Error fetching post: {error.message}
            </div>
        );
    }

    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </article>
    );
}
