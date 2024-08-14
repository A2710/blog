import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}: {blog:Blog}) => {
    return <div>
        <div>
            <AppBar name={blog.author.name}></AppBar>
        </div>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-2xl">
                <div className="col-span-8">
                    <div className="text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-3">
                        post on 13th August 2024
                    </div>
                    <div className="pt-3">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 font-semibold text-sm">
                        Author
                    </div>
                    
                    <div className="flex">
                        <div className="pr-5 flex justify-center items-center">
                            <Avatar size={"big"} name={blog.author.name || "Anonymous"}></Avatar>
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}