import StlFromID from "@/components/stlFromID"
import { Job } from "@/types/types"
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
    return <div className="bg-gradient-to-r from-indigo-900 via-purple-800 to-purple-900 w-full h-screen">
        {job ? <div className="flex justify-center items-center ">
            <div>
            <h1 className="bg-purple-400 text-3xl ">{job.name}</h1>
            <p>{}</p>
            <p>{job.status}</p>
            <p>{job.user.email}</p>
            </div >
            <div className="m-20 p-10 ">
                <StlFromID id={job.id} />
            </div>
        </div> : <div>Loading...</div>}
    </div>
}