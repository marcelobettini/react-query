import { useEffect, useState } from "react";
import { getPostById } from "../api/posts";
import { Spinner } from "react-bootstrap"

export default function Post({ postId }) {
    const [state, setState] = useState("isLoading");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPostById(postId);
                setState(data);
            } catch (error) {
                setState("error");
            }
        };
        fetchData();
    }, [postId]);

    if (state === "isLoading") {
        return (
            <div className="d-flex">
                Loading <Spinner animation="grow" variant="success" /> Post...
            </div>
        );
    }

    if (state === "error") {
        return (
            <div className="alert alert-danger">
                Error fetching post: {error.message}
            </div>
        );
    }

    return (
        <article>
            <h1>{state.title}</h1>
            <p>{state.body}</p>
        </article>
    );
}
