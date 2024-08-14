import { ChangeEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@aditya2710/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type} : {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        username: "",
        password: "",
        name: ""
    });

    async function sendRequest()
    {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            console.log(response);

            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }
        catch(e){
            //alert the user here that the request failed
            alert(`Error while signing up ${e}`);
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        {/* {JSON.stringify(postInputs)} */}
        <div className="flex justify-center">
            <div>
                <div className="px-16">
                    <div className="text-3xl font-extrabold">
                        Create an Account
                    </div>
                    <div className="text-slate-400 font-semibold">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"} 
                        <Link className="pl-1 underline" to={type === "signin" ? "/signup" : "/signin"}> {type === "signin" ? "Sign up" : "Sign in"} </Link>
                    </div>
                </div>
                <div className="mt-10">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Aditya Agarwal" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }}></LabelledInput>:null}
                    
                    <LabelledInput label="UserName" placeholder="aditya123@gmail.com" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            username: e.target.value
                        }))
                    }}></LabelledInput>
                    
                    <LabelledInput label="Password" type={"password"} placeholder="Aditya Agarwal" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }}></LabelledInput>

                    <button onClick={sendRequest} type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold 
                    rounded-lg text-md px-5 py-5 mt-4 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Signup": "Signin"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
    return <div>
        
        <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={type || "text"} id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 
            rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </div>
}