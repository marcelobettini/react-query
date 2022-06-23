import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { createNewPost } from "../api/posts";

function NewPost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            await createNewPost({ title, body });

            setTitle("");
            setBody("");
        } catch (error) {
            setError(error);
        }

        setIsLoading(false);
    };

    return (
        <section>
            <h2>Create Post:</h2>
            <Form onSubmit={handleSubmit} className="">
                <div className="mb-2">
                    <Form.Label htmlFor="title">
                        <b>Title:</b>
                    </Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id="title"

                    />
                </div>
                <div className="mb-2">
                    <Form.Label htmlFor="content">
                        <b>Content:</b>
                    </Form.Label>
                    <Form.Control as={'textarea'}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        style={{ resize: "vertical" }}
                        id="content"
                        rows={5}
                    ></Form.Control>
                </div>

                <button disabled={isLoading || !title} className="btn btn-success mb-2">
                    {isLoading ? (
                        <>
                            Submitting...<span className="spinner-border spinner-border-sm"></span>

                        </>
                    ) : (
                        "Submit"
                    )}
                </button>
                {error && (
                    <p className="alert alert-danger">
                        Error creating the post: {error.message}
                    </p>
                )}

            </Form>
        </section>
    );
}

export default NewPost;