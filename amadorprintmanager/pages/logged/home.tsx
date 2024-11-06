import JobChart from "@/components/jobChart";
import { Job } from "@/types/types";
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Home() {
    const [loading, setLoading] = useState(true)
    const [jobs, setJobs] = useState(null as Job[] | null)
    useEffect(() => {
        fetch("/api/getselfjobs").then(async (res) => {
            setLoading(false)
            let t = await res.json()
            setJobs(t)
        })
    }, [])
    const s = useSession()
    return (
        <div className=" bg-gradient-to-r h-full from-indigo-900 via-purple-800 to-purple-900">
            <header className="sticky top-0 bg-gradient-to-r from-purple-300 via-white to-yellow-100 shadow-md p-2 flex justify-between items-center">
                <h1 className="text-black text-2xl font-semibold">Home</h1>
                <div className="flex space-x-4">
                    {s?.data?.user?.role === "teacher" && (
                        <a href="/logged/browse" className="px-4 py-2 bg-purple-700 rounded-xl text-white hover:bg-purple-600 transition">
                            Check Submitted Jobs
                        </a>
                    )}
                    <a href="/logged/submitjob">
                    <button
                        className="px-4 py-2 bg-purple-700 rounded-xl text-white hover:bg-purple-600 transition"
                    >
                        Submit Job
                    </button>
                    </a>
                    <button className="px-4 py-2 bg-purple-700 rounded-xl text-white hover:bg-purple-600 transition">
                        Account Settings
                    </button>
                    <button
                        onClick={() => { signOut(); }}
                        className="px-4 py-2 bg-yellow-400 rounded-xl text-black hover:bg-yellow-300 transition"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center items-center min-h-[calc(90vh-5rem)] text-black text-xl">
                    Loading your jobs...
                </div>
            ) : (
                <div className="flex justify-center text-black py-10">
                    <JobChart jobs={jobs} setJobs={setJobs} editable={false} />
                </div>
            )}
        </div>
    );
};