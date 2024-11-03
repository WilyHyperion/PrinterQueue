import { Job } from "@/types/types";
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";





export default function Home() {
    const [jobs, setJobs] = useState([] as Job[])
    useEffect(() => {
        fetch("/api/getselfjobs").then(async (res) => {
            let t = await res.json()
            setJobs(t)
            console.log(t)
        })
    }, [])
    const s  = useSession()
    return (
        <div>
        <div className = "absolute top-0 h-fit w-full bg-gradient-to-r from-purple-300 via-white to-yellow-100 flex justify-between items-center p-4">
            <h1 className = "text-black text-xl px-2 flex items-center">Home</h1>
            <div className ="flex space-x-2">
                {s?.data?.user.role == "teacher" && <a href = "/logged/browse" className = "flex items-center y-2 px-4 py-.5 bg-purple-700 rounded-xl text-black">Check Submitted Jobs</a>}
                <button className = "flex items-center y-2 px-4 py-.5 bg-purple-700 rounded-xl text-black">Account settings</button>
                <button onClick={() => {signOut()}} className = "flex items-center y-2 px-6 py-.5 bg-yellow-400 rounded-xl text-black">Logout</button>
            </div>
        </div>
        <div className="flex justify-center bg-gradient-to-r from-indigo-900 via-purple-800 to-purple-900 w-screen h-screen">
            <div className =" bg-white text-black w-11/12 h-auto rounded-3xl p-3 m-5 mt-20 min-h-52">
            <div className ="flex bg-gray-400 w-full items-center justify-between rounded-3xl h-10 p-5">
                <text className="p-5">
                File Name
                </text>
                <text className="p-5">
                Status
                </text>
                <text className="p-5">
                Print Time
                </text>
                <text className="pr-96">
                Image Preview
                </text>
                <a href="/logged/submitjob">
                <button className="bg-red-500 rounded-xl px-5">
                     Request something to be printed
                </button>
                </a>
            </div >
            <div className="flex flex-col items-center justify-center h-auto min-h-96 max-h-screen text-center w-full">
                {jobs.map((job) => {
                    return <div className = "flex flex-row w-full">
                        <div> {job.name}</div>
                        <div> {job.status}</div>
                        <div> {job.printTime}</div>
                    </div>
                                    })}
            </div>
            </div>
        </div>
        </div>
    )   
}