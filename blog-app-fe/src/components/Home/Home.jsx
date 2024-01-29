import { useEffect } from 'react';
import { useBlogsContext } from '../../customHooks/useBlogsContext';
import { useAuthContext } from "../../customHooks/useAuthContext";
import { Link } from 'react-router-dom';
import AddBlog from '../Blog/AddBlog';


const Home = () => {
    const {user} = useAuthContext();
    const {blogs, dispatch} = useBlogsContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch('http://localhost:4000/api/blogs');
            const json = await res.json();

            if (res.ok) {
                dispatch({type:'SET_BLOGS', payload: json});
            };
        }

        fetchBlogs();
    }, [dispatch]);

    const handleDelete = (_id) => {
        const deleteBlog = async () => {
            const res = await fetch('http://localhost:4000/api/blogs/' + _id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await res.json();

            if(res.ok) {
                dispatch({type: 'DELETE_BLOG', payload: json});
            }
        }

        try {
            deleteBlog();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='home'>
            <div className='add-blogs'>
                <AddBlog></AddBlog>
            </div>
            <div className="show-blogs">
                {
                    blogs && blogs.map((blog) => {
                        return <div key={blog._id}>
                            <Link to={`/${blog._id}`}><p>{blog.title}</p>
                            <p>{blog.userId}</p></Link>
                            <button onClick={() => {handleDelete(blog._id)}}>Delete</button>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Home;