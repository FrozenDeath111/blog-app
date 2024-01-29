import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { useState } from "react";

const Comment = (props) => {
  const { user } = useAuthContext();
  let { _id, name, email, body, id } = props.comment;
  const [isCommentor, setIsCommentor] = useState(true);
  const [editEnable, setEditEnable] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [error, setError] = useState(null);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const navigate = useNavigate();

  if (user && user.email !== email) {
    setIsCommentor(false);
  }

  const handleEdit = async (event) => {
    event.preventDefault();

    const comment = {body: commentBody};

    const res = await fetch('http://localhost:4000/api/comments/'+_id, {
            method: 'PATCH',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await res.json();

        if(!res.ok) {
            setError(json.error);
        };

        if(res.ok){
            setCommentBody(commentBody);
            setError(null);
            console.log('Comment Updated', json);
        };

        setEditEnable(false);

        const getComments = JSON.parse(localStorage.getItem("comments"));

        if (getComments !== null) {
            getComments.map((comment) => {
                if (comment.id === id) {
                  comment.body = commentBody;
                }
                return comment;
            });
        }
        localStorage.removeItem('comments');
        localStorage.setItem('comments', JSON.stringify(getComments));
  };

  const handleDeleteComment = (_id) => {
    const deleteComment = async () => {
        const res = await fetch("http://localhost:4000/api/comments/" + _id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
  
        const json = await res.json();
  
        if (res.ok) {
            console.log('Comment Deleted: ', json);
            setCommentDeleted(true)
            navigate('./');
            let getComments = JSON.parse(localStorage.getItem("comments"));
            if (getComments !== null) {
                getComments = getComments.filter(rm => rm._id !== _id);
            }
            localStorage.removeItem('comments');
            localStorage.setItem('comments', JSON.stringify(getComments));
        }
      };
  
      try {
        deleteComment();
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div>
        { !commentDeleted &&
        <div>
        {
            error && <div className="error">{error}</div>
        }
      <h3>{name}</h3>
      {(editEnable && isCommentor ) ? (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            placeholder={body}
            onChange={(e) => setCommentBody(e.target.value)}
            value={commentBody}
          />
          <button type="submit">submit</button>
        </form>
      ) : (
        <div>
          <p>{commentBody === '' ? body : commentBody}</p>
          <button onClick={() => setEditEnable(!editEnable)} disabled={!isCommentor}>Edit</button>
        </div>
      )}
      <button
        onClick={() => {
          handleDeleteComment(_id);
        }}
      >
        Delete
      </button>
      </div>
      }
    </div>
  );
};

export default Comment;
