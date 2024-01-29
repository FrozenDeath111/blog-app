import { BlogsContext } from "../context/BlogContext";
import { useContext } from "react";

export const useBlogsContext = () => {
    const context = useContext(BlogsContext);
    
    if(!context) {
        throw Error('Must be inside BlogsContext');
    }

    return context
}