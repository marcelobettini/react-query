import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { Spinner, Table } from "react-bootstrap"

export default function Posts({ setPostId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState(null);
    const fetchData = async () => {
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (error) {
            setError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="d-flex">
                Loading <Spinner animation="border" variant="success" role="status" /> Posts...
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
                <tbody style={{ display: "block", maxHeight: '70vh', overflow: "auto" }}>

                    {posts.map((post) => (
                        <tr key={post.id} onClick={() => setPostId(post.id)} >
                            <td >{post.title.toUpperCase()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </section>
    );
}