import { signOut } from "next-auth/react"

const orders = ({ fileName, status, printTime, }) => {
    return (
      <div className="p-4 bg-gray-100 rounded shadow">
        <h2 className="text-xl font-bold">{fileName}</h2>
        <p>{status}</p>
      </div>
    );
  };



export default function Home() {
    return (
        <div>
        <div className = "absolute top-0 h-fit w-full bg-purple-300 flex justify-between items-center p-4">
            <h1 className = "text-black text-xl px-2 flex items-center">Home</h1>
            <div className ="flex space-x-2">
                <button className = "flex items-center y-2 px-4 py-.5 bg-purple-700 rounded-xl text-black">Account settings</button>
                <button onClick={() => {signOut()}} className = "flex items-center y-2 px-6 py-.5 bg-yellow-400 rounded-xl text-black">Logout</button>
            </div>
        </div>
        <div className="flex flex-col justify-normal min-h-screen bg-purple-950">
            <div className ="bg-purple-600 w-11/12 h-auto rounded-3xl p-3 m-5 mt-20 min-h-52">
            <div className ="flex bg-purple-950 w-full items-center rounded-3xl h-10 p-5">
                <text className="p-5">
                File Name
                </text>
                <text className="p-5">
                Status
                </text>
                <text className="p-5">
                Print Time
                </text>
            </div >
            <div className="flex flex-col items-center justify-center h-auto min-h-96 max-h-screen text-center">
                <p>Welcome to the Amador Print Manager <br /> You dont have  anything requested yet</p>
                <a href="/logged/submitjob">Request something to be printed</a>
            </div>
            </div>
        </div>
        </div>
    )   
}