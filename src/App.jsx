import { useState } from "react";
import NewPost from "./components/NewPost";
import Post from "./components/Post";
import Posts from "./components/Posts";

export default function App() {
  const [postId, setPostId] = useState(null);

  return (
    <main className="container">
      <h1 className="mb-4">React-Query Demo</h1>
      {postId && (
        <div>
          <a onClick={() => setPostId(null)} href="#">
            Back
          </a>
        </div>
      )}
      {postId ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <div className="row gap-4">
          <div className="col-md">
            <NewPost />
          </div>
          <div className="col-md">
            <Posts setPostId={setPostId} />
          </div>
        </div>
      )}
    </main>
  );
}
