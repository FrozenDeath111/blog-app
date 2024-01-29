import { useState } from "react";
import { useAuthContext } from "../../customHooks/useAuthContext";
import { useBlogsContext } from '../../customHooks/useBlogsContext';

const AddBlog = () => {
    const { dispatch } = useBlogsContext();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);

    const {user} = useAuthContext();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userId = user.userId;

        const blog = {title, body, userId};

        const res = await fetch('http://localhost:4000/api/blogs', {
            method: 'POST',
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
            console.log('Blog Added', json);
            dispatch({type: 'CREATE_BLOGS', payload: json});
        };
    }

    return (
        <div>
            <form className="add-blog-form" onSubmit={handleSubmit}>
                <h1>Add blog</h1>
                <input 
                type="text"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                 />
                 <input 
                type="textarea"
                placeholder="description"
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

export default AddBlog;