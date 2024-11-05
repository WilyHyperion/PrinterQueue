import JobChart from "@/components/jobChart";
import { Job } from "@/types/types";
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
export default function Home() {
    const [jobs, setJobs] = useState(null as Job[] | null)
    useEffect(() => {
        fetch("/api/getselfjobs").then(async (res) => {
            let t = await res.json()
            setJobs(t)
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
          <JobChart jobs={
            jobs
          } setJobs={setJobs} editable = {false}></JobChart>
        </div>
        </div>
    )   
}