import { Job } from "@/lib/types";
import { useEffect, useState } from "react";


export default function BrowseJobs() {
    const [jobs, setJobs] = useState([] as Job[])
    useEffect(() => {
        fetch("/api/getjobs").then(async (res) => {
            let t = await res.json()
            setJobs(t)
            console.log(t)
        })
    }, [])
    return(<div className ="w-full min-h-screen flex items-center justify-center">
        <ol className="w-1/2">
            {jobs.map((job) => {
                return <li key={job.id}>{job.name} by {job.user.email}  </li>
            })}
        </ol>
    </div>)
}
