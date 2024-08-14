import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}   

export const BlogCard = ({authorName, title, content, publishedDate, id}:BlogCardProps) => {
    const nameArr = authorName.split(" ")
    let fName = nameArr[0];
    let lName = nameArr[1];

    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex items-center">            
            <Avatar size={"small"} name={fName + lName}/><div className="font-extralight text-sm pl-2">{authorName}</div> <div className=" pl-2 flex justify-center items-center"> <Circle /> </div> <div className="pl-2 font-thin text-sm text-slate-400">{publishedDate}</div>
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.length > 100? content.slice(0,100) + "..." : content}
        </div>
        <div className="text-xs font-thin text-slate-500 pt-4">
            {`${Math.ceil(content.length / 100)} minutes read`}
        </div>
    </div>
    </Link>
}

export function Avatar({name, size="big"}: {name:string, size ?: "big" | "small"}){
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-800 text-white rounded-full ${size === "big" ? "w-10 h-10" : "w-6 h-6"}`}>
        <span className={`font-medium text-white ${size === "big" ? "text-md" : "text-xs"}`}>{name[0].toUpperCase()}</span>
    </div>
}

export function Circle()
{
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}