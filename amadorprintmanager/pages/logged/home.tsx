import { signOut } from "next-auth/react"



export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-950">
            <div className = "absolute top-0 h-10 w-full bg-purple-300 flex items-center">
                <h1 className = "">Student Id Number</h1>
                <h1 className = "absolute right-4 ">Colin Jennings</h1>
                
            </div>
            <h1>Home</h1>
            <p>Welcome to the Amador Print Manager</p>
            <a href="/logged/submitjob">Request something to be printed</a>
            <button onClick={() => {signOut()}}>Logout</button>
        </div>
    )   
}