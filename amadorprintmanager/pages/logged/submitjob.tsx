import { Job } from "@/lib/types"
import { useState } from "react"

export default function SubmitJob() {
    return (<>
        <h1>Submit a Job</h1>
        <form action="/api/jobsubmit" method="post" encType="multipart/form-data">
            <input type="file" name="file" required />
            <input type="text" name="name" placeholder="Name" required />
            <button type="submit">Submit</button>
        </form>
    </>)
}