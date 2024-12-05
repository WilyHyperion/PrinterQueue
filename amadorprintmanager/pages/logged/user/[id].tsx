import Header from "@/components/header";
import JobChart from "@/components/jobChart";
import { roles } from "@/types/Constants";
import { Job } from "@/types/types";
import { useEffect, useState } from "react";

export default function UserView() {
  const [user, setUser] = useState(null as any | null);
  const [id, setId] = useState("");
  const [jobs, setJobs] = useState([] as Job[]);
  useEffect(() => {
    let id = window.location.pathname.split("/")[3];
    setId(id);
    fetch("/api/getuser", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      let t = await res.json();
      console.log(t);
      setUser(t.user);
      setJobs(t.jobs);
    });
  }, []);
  return (
    <div>
      <Header />
      <div className="flex flex-col w-full h-full  bg-gradient-to-r  from-indigo-900 via-purple-800 to-purple-900  min-h-screen items-center justify-around    ">
        <div className="bg-white p-6 text-black rounded-lg shadow-lg w-full max-w-[90%] my-[5%] min-h-[50vh] flex relative flex-col gap-2">
          {user ? (
            <>
              <h1 className="text-3xl font-semibold text-purple-700 py-5">{user.name}</h1>
              <p className="text-gray-500"><strong>Email:</strong>{user.email}</p>
              <p className="text-gray-500"><strong>Student ID:</strong>{user.studentID}</p>
              <div className="flex flex-row items-center gap-5"><p className="text-gray-500"><strong>Role: </strong></p> <select className="px-5 py-2 rounded-md" defaultValue={user.role} onChange={
                (e) => {
                  fetch("/api/changeUserRole", {
                    method: "POST",
                    body: JSON.stringify({
                      id: id,
                      role: e.target.value
                    }),
                    headers: {
                      "Content-Type": "application/json"
                    }
                  }).then(async (res) => {
                    let t = await res.json()
                    console.log(t)
                  })
                }
              } >
                {
                  [...roles.elevated, ...roles.peasant].map((role) => {
                    return <option value={role} className="p-5">{role}</option>
                  })
                }

              </select></div>
              <p className="text-gray-500"><strong>Number of Jobs:</strong>{jobs.length}</p>
              <p className="text-gray-500"><strong>Internal ID:</strong> {user._id}</p>
              <JobChart jobs={jobs} setJobs={setJobs} editable={false} />
              <button className="absolute right-5 top-5 bg-red-800 text-black px-5 py-2 rounded-md font-bold hover:text-white" onClick={
                () => {
                  if (window.confirm("Are you sure you want to delete this user?\n This action cannot be undone.")) {
                    fetch("/api/deleteUser", {
                      method: "POST",
                      body: JSON.stringify({
                        id: id
                      }),
                      headers: {
                        "Content-Type": "application/json"
                      }
                    }).then(async (res) => {
                      if(res.status == 200){
                        window.location.href = "/logged/users"
                      }
                    })
                  }
                }
              }>Delete User</button>
            </>
          ) : (
            <div>Loading user info...</div>
          )}
        </div>
      </div>
    </div>
  );
}
