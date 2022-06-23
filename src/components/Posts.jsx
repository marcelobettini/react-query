import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { Spinner, Table } from "react-bootstrap"

export default function Posts({ setPostId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState(null);
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await getPosts();
            setPosts(data);
            setError(null);
        } catch (error) {
            setError(error);
            setPosts(null);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="d-flex">
                Loading <Spinner animation="grow" variant="success" /> Posts...
            </div>
        );
    }

    if (error) {
        return (
            <section className="alert alert-danger">
                Error fetching posts: {error.message}
            </section>
        );
    }

    return (
        <section>
            <h2>Posts:</h2>
            <Table bgcolor="mistyrose" hover>
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>

                    {posts.map((post) => (
                        <tr key={post.id} onClick={() => setPostId(post.id)} >

                            <td >{post.title}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </section>
    );
}