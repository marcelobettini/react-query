import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";
import { Spinner, Table } from "react-bootstrap"

export default function Posts({ setPostId }) {
    const [state, setState] = useState("isLoading");

    const fetchData = async () => {
        try {
            const data = await getPosts();
            setState(data);
        } catch (error) {
            setState("error");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (state === "isLoading") {
        return (
            <div className="d-flex">
                Loading <Spinner animation="grow" variant="success" /> Posts...
            </div>
        );
    }

    if (state === "error") {
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

                    {state.map((post) => (
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