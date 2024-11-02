import Image from "next/image";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-950">
    <img
      src = './backgroundGear.svg'
      height={800}
      width={800}
      className= "absolute top-0 left-0 w-auto h-1/1 transform -translate-x-1/2 -translate-y-1/2"
    />
    <img
      src = './backgroundGear.svg'
      height={800}
      width={800}
      className= "absolute top-0 right-0 w-auto h-auto transform -translate-y-1/2 translate-x-1/2"
    />
     <p className="text-purple-500 text-7xl font-bold text-center ">
        Amador Valley <br /> Engineering <br /> 3D Printing Service
      </p>
      <a href ="/login">
      <button
        className="mt-20 bg-yellow-400 text-black py-2 px-40 rounded-lg hover:bg-yellow-200 transition-colors"
      >
        Login
      </button>
      </a>
   </div>
  );
}
