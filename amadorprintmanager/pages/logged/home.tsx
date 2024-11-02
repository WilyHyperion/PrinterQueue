import { signOut } from "next-auth/react"


export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the Amador Print Manager</p>
            <a href="/logged/submitjob">Request something to be printed</a>
            <button onClick={() => {signOut()}}>Logout</button>
        </div>
    )   
}