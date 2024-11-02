import { signOut } from "next-auth/react"



export default function Home() {
    return (
        <div>
        <div className = "absolute top-0 h-fit w-full bg-purple-300 flex justify-between items-center p-4">
            <h1 className = "text-black text-xl px-2 flex items-center">Home</h1>
            <div className ="flex space-x-2">
                <button className = "flex items-center y-2 px-4 py-.5 bg-purple-700 rounded-xl text-black">Account settings</button>
                <button onClick={() => {signOut()}} className = "flex items-center y-2 px-6 py-.5 bg-yellow-400 rounded-xl text-black">Logout</button>
            </div>
        </div>
        <div className="flex flex-col justify-normal min-h-screen bg-purple-950">
            <div className ="bg-purple-600 w-11/12 h-auto rounded-3xl p-3 m-5 mt-14">
            <div className ="bg-purple-950 w-full rounded-3xl h-10">

            </div>
                <p>Welcome to the Amador Print Manager</p>
                <a href="/logged/submitjob">Request something to be printed</a>
            </div>
        </div>
        </div>
    )   
}