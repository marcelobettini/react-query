import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { createNewPost } from "../api/posts";
import { useMutation, useQueryClient } from "react-query";

function NewPost() {
  let userId = null
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient(); //para invalidar la cache y forzar el refetch

  //first, only useMutation(createNewPost)... for refetching, the line below with onSuccess and the callback
  const { mutate, error, isLoading, isSuccess, reset } = useMutation(
    createNewPost,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    userId = Math.round(Math.random() * 10)

    //primero mutate({title, body}). Luego, pasamos onSuccess con los setters de estado local para limpiar el form. También podríamos tirarlos en el onSuccess de la configuración general de la mutación. Pero es más específico indicarlo aquí, es decir, para esta implementación de la mutación.
    mutate(
      { userId, title, body },
      {
        onSuccess: () => {
          setTitle("");
          setBody("");
        },
      }
    );

    //   setIsLoading(true);
    //   try {
    //     await createNewPost({ title, body });
    //  setTitle("");
    //  setBody("");
    //   } catch (error) {
    //     setError(error);
    //   }

    //   setIsLoading(false);
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
          <Form.Control
            as="textarea"
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
              Submitting...
              <span className="spinner-border spinner-border-sm"></span>
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

        {isSuccess && (
          <div className="alert alert-success d-flex justify-content-between">
            Created ok!
            <button onClick={reset} className="btn btn-close"></button>
          </div>
        )}
      </Form>
    </section>
  );
}

export default NewPost;
