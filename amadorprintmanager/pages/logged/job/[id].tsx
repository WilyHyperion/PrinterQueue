import StlFromID from "@/components/stlFromID"
import { Job } from "@/types/types"
import { use, useEffect, useState } from "react"
import { useSession } from "next-auth/react"



export default function JobView() {
    const [job, setJob] = useState(null as Job | null)
    const s = useSession();
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
    }, []
)
    return (
        <div className="bg-gradient-to-r h-auto from-indigo-900 via-purple-800 to-purple-900 w-full">
            {job ? (
                <div className="flex justify-center items-center p-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                        <h1 className="text-3xl font-semibold text-purple-700">{job.name}</h1>
                        
                       
                        <div className="mt-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">Submission Details:</h3>
                                <p className="text-gray-500"><strong>Status:</strong> {job.status}</p>
                                <p className="text-gray-500"><strong>Printer:</strong> {job.printer}</p>
                                <p className="text-gray-500"><strong>Color:</strong> {job.color}</p>
                                <p className="text-gray-500"><strong>Infill Density:</strong> {job.inFillPercentage}%</p>
                                <p className="text-gray-500"><strong>Estimated Print Time:</strong> {job.printTime} Hours</p>
                                <p className="text-gray-500"><strong>Notes:</strong> {job.notes}</p>

                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium text-gray-700">User Information:</h3>
                                <p className="text-gray-500"><strong>Name:</strong>{/*{job.user.name}*/}</p>
                                <p className="text-gray-500"><strong>Email:</strong> {job.user.email}</p>
                                <p className="text-gray-500"><strong>School ID:</strong> {job.user.studentID}</p>
                            </div>
                            {s?.data?.user?.role === "teacher" && (
                            <div className="mt-6 p-4 border-2 text-black border-gray-300 rounded-lg bg-gray-50">
                                <h3 className="text-lg font-medium text-gray-700">Teacher Response:</h3>
                            
                                <textarea 
                                    placeholder="Enter teacher's response here..."
                                    className="w-full h-32 mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                                />
                                <button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg">
                                    Submit Response
                                </button>
                            </div>
                            )}
                        </div>

                        <div className="mt-10">
                            <h3 className="text-lg font-medium text-gray-700">STL Model Preview:</h3>
                            <div className="mt-4">
                                <StlFromID id={job.id} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-white text-center p-10">Loading...</div>
            )}
        </div>
    )
}
