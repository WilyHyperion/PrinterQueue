import { useEffect, useState } from "react";

const statusColors = {
  "submited": "bg-yellow-300",
  "printing": "bg-blue-300",
  "complete": "bg-green-300",
  "rejected": "bg-red-300",
} as {
  [key: string]: string
}
export default function StatusDropdown(props: {
  defaultValue: string,
  id: string,
  changeStatus: (status: string) => void,
  editable: boolean
}) {
  const [status, setStatus] = useState(props.defaultValue)
  useEffect(() => {
    setStatus(props.defaultValue)
  }, [props.defaultValue])
  return (<div className={`flex flex-row items-center justify-evenly w-[15%] px-5 py-2 rounded-full h-[4vh]  ${statusColors[status] || "bg-gray-300"
    }`}>
    {props.editable ? <select
      value={status}
      onChange={(e) => {
        setStatus(e.target.value);
        props.changeStatus(e.target.value);
        fetch("/api/updatestatus", {
          method: "POST",
          body: JSON.stringify({
            id: props.id,
            status: e.target.value,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });
      }}
      className="bg-transparent border-none"
    >
      <option value="submited" className=" w-full bg-red ">Submited</option>
      <option value="printing" className=" w-full bg-red ">Printing</option>
      <option value="complete" className=" w-full bg-red ">Complete</option>
      <option value="rejected" className=" w-full bg-red ">Rejected</option>
    </select> : <div>{status}</div>
      }
  </div>)
}