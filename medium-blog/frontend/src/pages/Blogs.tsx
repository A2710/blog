import { BlogCard } from "../components/BlogCard"
import { AppBar } from "../components/AppBar"
import { useBlogs } from "../hooks";
// import { Blog } from "./Blog";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading)
    {
        return <div>
            
        <div>
            <AppBar name=""></AppBar>
        </div>
        <div className="w-screen h-screen flex flex-col ">
            <div className="flex flex-col items-center justify-center mt-5">
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
        </div>
        </div>
        </div> 
    }

    return <div>
        <div>
            <AppBar name=""></AppBar>
        </div>
        <div className="flex justify-center pt-5">
        <div>
            {
                blogs.map(blog => <BlogCard authorName={blog.author.name || "Anonymous"}
                    id = {blog.id}
                    title={blog.title}
                    content = {blog.content}
                    publishedDate={"2nd Feb 2024"}></BlogCard>
                )
            }
            
            {/* <BlogCard authorName={"Harkirat Singh"} title={"How an Ugly Single-Page Website Makes $5,000 a Month with Afilliate Marketing"} content = {"content of the blog"} publishedDate={"2nd Feb 2024"}></BlogCard>
            <BlogCard authorName={"Harkirat Singh"} title={"How an Ugly Single-Page Website Makes $5,000 a Month with Afilliate Marketing"} content = {"content of the blog"} publishedDate={"2nd Feb 2024"}></BlogCard>
            <BlogCard authorName={"Harkirat Singh"} title={"How an Ugly Single-Page Website Makes $5,000 a Month with Afilliate Marketing"} content = {"content of the blog"} publishedDate={"2nd Feb 2024"}></BlogCard>
            <BlogCard authorName={"Harkirat Singh"} title={"How an Ugly Single-Page Website Makes $5,000 a Month with Afilliate Marketing"} content = {"content of the blog"} publishedDate={"2nd Feb 2024"}></BlogCard> */}
        </div>
        </div>
    </div>
}