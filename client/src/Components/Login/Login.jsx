import React from 'react'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


const Login = () => {
  return (
    <div
      className=" h-screen w-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
      }}>
      <div className="flex flex-col items-center w-full max-w-2xl p-8 space-y-8 bg-gray-800 bg-opacity-70 rounded-xl">
        <h1 className="text-3xl font-semibold text-white">
          Pune Institute Computer of Technology
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div className="h-80 md:h-96 w-full bg-blue-500 bg-opacity-80 rounded-lg flex flex-col justify-center items-center p-8">
            <h2 className="text-4xl font-extrabold text-white mb-4">Faculty</h2>
            <Link
              to="/login/facultylogin"
              className="bg-white text-blue-500 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
              Login
            </Link>
          </div>
          <div className="h-80 md:h-96 w-full bg-red-500 bg-opacity-80 rounded-lg flex flex-col justify-center items-center p-8">
            <h2 className="text-4xl font-extrabold text-white mb-4">Student</h2>
            <Link
              to="/login/studentlogin"
              className="bg-white text-red-500 py-2 px-4 rounded-lg text-lg font-semibold hover:bg-red-600 hover:text-white transition duration-300">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
