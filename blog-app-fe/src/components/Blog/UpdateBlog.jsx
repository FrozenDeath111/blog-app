import { useAuthContext } from "../../customHooks/useAuthContext";
import { useBlogsContext } from '../../customHooks/useBlogsContext';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdateBlog = () => {
    const { user } = useAuthContext();

    const { id } = useParams();
    const {dispatch} = useBlogsContext();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch(`http://localhost:4000/api/blogs/${id}`);
            const json = await res.json();

            if (res.ok) {
                if(user.userId !== json.userId) {
                    setError('Not Creator');
                    navigate('/'+id);
                }
                setBlog(json);
            };
        }

        fetchBlogs();
    }, [id])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const blog = {title, body};

        const res = await fetch('http://localhost:4000/api/blogs/'+id, {
            method: 'PATCH',
            body: JSON.stringify(blog),
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
            setTitle('');
            setBody('');
            setError(null);
            console.log('Blog Updated', json);
            dispatch({type: 'Update', payload: json});
            navigate('/'+id);
        };
    }

    return (
        <div>
            <form className="update-blog" onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder={blog && blog.title}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                />
                <input 
                type="textarea"
                placeholder={blog && blog.body}
                onChange={(e) => setBody(e.target.value)}
                value={body}
                 />
                 <button type="submit">submit blog</button>
                 {
                    error && <div className="error">{error}</div>
                 }
            </form>
        </div>
    );
};

export default UpdateBlog;