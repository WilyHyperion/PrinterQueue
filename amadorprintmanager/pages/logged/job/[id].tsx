import { Job } from "@/lib/types"
import { use, useEffect, useState } from "react"


export default function JobView() {
    const [job, setJob] = useState(null as Job | null)
    useEffect(() => {
        //use router was not working for some reason
        let id = window.location.pathname.split("/")[3]
        fetch(`/api/getjob`, {
            method: "POST",
            body: JSON.stringify({
                id: id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            let t = await res.json()
            console.log(t)
            setJob(t)
        })
    }, [])
    return <div>Job
        {job ? <div>
            <h1>{job.name}</h1>
            <p>{}</p>
            <p>{job.status}</p>
            <p>{job.user.email}</p>
        </div> : <div>Loading...</div>}
    </div>
}