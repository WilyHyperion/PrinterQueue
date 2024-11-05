import { Job } from "@/types/types";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import JobChart from "@/components/jobChart";
import Image from "next/image";

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([] as Job[]);
  useEffect(() => {
    fetch("/api/getjobs").then(async (res) => {
      let t = await res.json();
      setJobs(t);
      console.log(t);
    });
  }, []);
  return (
    <div className="flex flex-col">
      <div className="w-full h-screen  bg-gradient-to-r  from-indigo-900 via-purple-800 to-purple-900 ">
        <Image className=" absolute left-5 top-5 cursor-pointer    " alt = "Back" width={25} height={25} src = "/backarrow.svg" onClick={() => {
          window.location.href = "/logged/home"

        }}></Image>
        <div className="bg-white w-full h-15 text-black text-3xl p-3 flex justify-center items-center ">
          <text>Order Submissions</text>
        </div>
        <div className="h-full">
          <JobChart jobs={jobs} setJobs ={setJobs} editable />
        </div>
      </div>
    </div>
  );
}
