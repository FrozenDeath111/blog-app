import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { useBlogsContext } from "../../customHooks/useBlogsContext";
import { useEffect, useState } from "react";
import Comment from "./Comments";

const Blog = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { dispatch } = useBlogsContext();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [isCreator, setIsCreator] = useState(null);
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("http://localhost:4000/api/blogs/" + id);

      const json = await res.json();

      if (res.ok) {
        if (user) {
          if (user.userId !== json.userId) {
            setIsCreator(false);
          }
        }
        setIsCreator(true);
        setBlog(json);
      }
    };

    try {
      fetchBlogs();
    } catch (error) {
      setError(error);
    }
  }, [id, user]);

  useEffect(() => {
    const fetchComments = async () => {
      if (blog) {
        const res = await fetch(
          "http://localhost:4000/api/comments/" + blog.id
        );

        const json = await res.json();

        if (res.ok) {
          setComments(json);
          localStorage.setItem("comments", JSON.stringify(json));
        }
      }
    };

    try {
      const getComments = JSON.parse(localStorage.getItem("comments"));

      let blogComments = [];

      if (getComments === null) {
        fetchComments();
      } else {
        getComments.map((comment) => {
          if (blog !== null && comment.blogId === blog.id) {
            blogComments = [...blogComments, comment];
          }
          return comment;
        });

        if (blogComments.length > 0) {
          setComments(blogComments);
        } else {
          fetchComments();
        }
      }

      // if(getComments.length > 0) {
      //
      // }
      // else {
      //     fetchComments();
      // }
    } catch (error) {
      setError(error);
    }
  }, [blog]);

  const handleUpdate = () => {
    if (user.userId !== blog.userId) {
      setError("Not Allowed To Update");
      return;
    }

    navigate("/update/" + id);
  };

  const handleDelete = (id) => {
    const deleteBlog = async () => {
      const res = await fetch("http://localhost:4000/api/blogs/" + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "DELETE_BLOG", payload: json });
      }
    };

    try {
      deleteBlog();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = user.name;
    const email = user.email;

    const comment = { blogId: blog.id, name, email, body };
    console.log(comment);

    const res = await fetch("http://localhost:4000/api/comments", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }

    if (res.ok) {
      setBody("");
      setError(null);
      console.log("Comment Added", json);
      let getComments = JSON.parse(localStorage.getItem("comments"));
      if (getComments !== null) {
        getComments = [...getComments, json];
      }
      localStorage.removeItem("comments");
      localStorage.setItem("comments", JSON.stringify(getComments));

      setComments([...comments, json]);
    }
  };

  return (
    <div className="blog-details">
      {blog && (
        <div className="blog-body">
          <h1>Title: {blog.title}</h1>
          <p>CreatorID: {blog.userId}</p>
          <h3>{blog.body}</h3>
          <button onClick={handleUpdate} disabled={!isCreator}>
            Update
          </button>
          <button onClick={handleDelete} disabled={!isCreator}>
            Delete
          </button>

          {error && <div className="error">{error}</div>}
        </div>
      )}
      <div className="comment-details">
        {comments &&
          comments.map((comment) => {
            return <Comment comment={comment} key={comment._id}></Comment>;
          })}
      </div>
      <div className="create-comment">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Right comments here"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
