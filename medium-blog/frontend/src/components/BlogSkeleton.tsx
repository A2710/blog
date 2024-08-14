import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return <div className="mb-10">
        
        <div role="status" className="max-w-screen-lg animate-pulse">

            <div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex items-center">            
                    <div className="h-4 w-10 bg-gray-200 rounded-full w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    <div className=" pl-2 flex justify-center items-center"> <Circle /> </div>
                    <div className="pl-2 font-thin text-sm text-slate-400">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="text-md font-thin">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="text-xs font-thin text-slate-500 pt-4">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
            </div>

            
            {/* <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div> */}
            {/* <span className="sr-only">Loading...</span> */}
        </div>


    </div>
}