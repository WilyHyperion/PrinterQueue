"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SignIn() {
  const credentialsAction = async  (formData: FormData) => {
    console.log("formData", formData);
    const formDataObj: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });
    let p = await signIn("credentials", formDataObj);
    console.log("p", p);
  };
  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
      window.location.href = "/logged/home";
    }
  }, [session]);
  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-950">
          <img
            src = './backgroundGear.svg'
            height={800}
            width={800}
            className= "absolute top-0 left-0 w-auto h-full object-contain transform -translate-y-1/2 -translate-x-1/2 max-w-md md:max-w-2xl lg:max-w-xl"
          />
          <img
            src = './backgroundGear.svg'
            height={800}
            width={800}
            className= "absolute top-0 right-0 w-auto h-full object-contain transform -translate-y-1/2 translate-x-1/2 max-w-md md:max-w-2xl lg:max-w-xl"
          />
          <form 
                action={credentialsAction} 
                className="bg-purple-600 p-6 rounded-lg shadow-lg w-full max-w-sm"
            >
                <h2 className="text-2xl text-yellow-400 font-bold mb-6 text-center">Sign In</h2>
                
                <label htmlFor="credentials-email" className="block mb-2 text-yellow-400">
                    Email
                    <input 
                        type="email" 
                        id="credentials-email" 
                        name="email" 
                        className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                        required 
                    />
                </label>

                <label htmlFor="credentials-password" className="block mb-4 text-yellow-400">
                    Password
                    <input 
                        type="password" 
                        id="credentials-password" 
                        name="password" 
                        className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                        required 
                    />
                </label>

                <input 
                    type="submit" 
                    value="Sign In" 
                    className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-purple-200 transition-colors cursor-pointer mb-4"
                />
          </form>
           
          <button 
          onClick={() => signIn("google")}
          className="mt-4 rounded-md flex items-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-yellow-400 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
          type="button"
          
          >
            <img
              src="/google.svg"
              alt="metamask"
              className="h-5 w-5 mr-2"
            />
  Continue with Google
</button>

          <a href="/register" className="mt-4 text-indigo-400 hover:underline">
                Create Account
          </a>
      </div>
    </>
  );
}
