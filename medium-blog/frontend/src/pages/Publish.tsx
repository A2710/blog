import { AppBar } from "../components/AppBar"
import {useState } from "react";
// import { useUserInfo } from "../hooks";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    // const {id} = useParams<{id:string}>();
    // const [name, setName] = useState();
    // const {user} = useUserInfo({
    //     id: id || ""
    // });

    return <div className="">
        <div>
            <AppBar name="Aditya"></AppBar>
        </div>
        <div className="flex justify-center">
            <div className="max-w-screen-xl w-full">
            
                <label className="block mb-2 text-sm font-medium text-gray-900">Your Email:</label>
                <input onChange={(e)=>{
                    setTitle(e.target.value);
                    
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5" placeholder="Title"/>

                <TextEditor onChange={(e) => {
                    setDescription(e.target.value);
                    
                }
                }></TextEditor>
                <button onClick={async () => {
                    // alert(title);
                    // alert(description);
                    // alert(`${BACKEND_URL}/api/v1/blog`);
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description, 
                    }, {
                        headers:{
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    console.log(response);
                    navigate(`/blog/${response.data.id}`);
                }} type="button" className="mt-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700
                rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Publish post
                </button>
            
            </div>
        </div>
    </div>
}

function TextEditor({ onChange }: {onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div>

        <div className="w-full mt-4 mb-4">
            <div className="flex items-center justify-between border rounded-lg">
                <div className="py-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only">Publish post</label>
                    <textarea onChange={onChange} name="" id="editor" rows={8} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2 focus:outline-none" placeholder="Write an article..." required></textarea>
                </div>
            </div>
        </div>
    </div>
}