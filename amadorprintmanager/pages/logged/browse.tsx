import { Job } from "@/types/types";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"

export default function BrowseJobs() {
    const [jobs, setJobs] = useState([] as Job[])
    useEffect(() => {
        fetch("/api/getjobs").then(async (res) => {
            let t = await res.json()
            setJobs(t)
            console.log(t)
        })
    }, [])
    return(
    <div className="flex flex-col">
        <div className="bg-white w-full h-15 text-black text-3xl p-3 flex justify-center items-center ">
            <text>Order Submissions</text>
        </div>
        <div className ="w-full h-screen flex  flex-col justify-center bg-gradient-to-r  from-indigo-900 via-purple-800 to-purple-900 ">
        <div className="bg-purple-950 w-auto h-auto p-5 m-5 rounded-3xl flex flex-row">
            <text className="mx-5 ml-5">Hello</text>
            <text className="mx-5 ml-5">Hello</text>
            <text className="mx-5 ml-5">Hello</text>
        </div> 
        <ol className="w-full h-full">
            {jobs.map((job) => {
                return  <li 
                key={job.id} 
                className="p-2 m-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => {
                  window.location.href = `/logged/job/${job.id}`;
                }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center ">
                  <div>
                    <h3 className="text-lg text-black">{job.name}</h3>
                    <p className="text-black">Submitted by {job.user.email}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.status === 'completed' 
                          ? 'bg-green-200 text-green-800' 
                          : job.status === 'In Progre' 
                          ? 'bg-yellow-200 text-black' 
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                </div>
              </li>
            })}
        </ol>
    </div>
    </div>)
}
