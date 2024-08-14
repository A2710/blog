import {useBlog} from "../hooks/index"
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    
    if(loading || !blog)
    {
        return <div className="h-screen flex items-center justify-center">
            <Spinner />
        </div>
    }
    return <div>
        <FullBlog blog={blog}/>
    </div>
}