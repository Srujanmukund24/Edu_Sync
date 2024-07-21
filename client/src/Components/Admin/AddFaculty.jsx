import React, { useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import axios from 'axios'
import { toast } from 'react-toastify'


const AddFaculty = () => {
    const [regid, setRegid] = useState('');
    const [fname, setFname] = useState('');
    const [mobile, setMobile] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = "/registerTeacher";
        // console.log(url);

        // Perform register operation using axios
        try {
            const {data} = await axios.post(url, {regid,fname,lname,email,mobile,password});
            // Redirect to admin dashboard on successful login
            // console.log("Teacher ", data);
            setRegid('');setEmail('');setFname('');setLname('');setMobile('');setPassword('');
            toast.success("Registration Successfull");
        } catch (error) {
            console.error('Registration failed', error);
            // Handle login failure, show error message to user, etc.
            toast.error("Registration Failed");
        }
    }

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow flex flex-col p-3 '>
                <div className='flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md '>
                    <div>
                        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Register Faculty
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
                        <div className='sm:p-10 no-scrollbar overflow-y-scroll absolute top-0 left-0 right-0 bottom-10 sm:bg-white sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-xl '>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className=' flex gap-5 justify-between'>
                                    <div className=' w-full'>
                                        <label htmlFor="fname" className="block text-lg font-medium leading-6 text-gray-900">
                                            First Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={fname}
                                                onChange={ev => setFname(ev.target.value)}
                                                id="fname"
                                                name="fname"
                                                type="fname"
                                                placeholder='enter first name'
                                                required
                                                className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className=' w-full'>
                                        <label htmlFor="lname" className="block text-lg font-medium leading-6 text-gray-900">
                                            Last Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={lname}
                                                onChange={ev => setLname(ev.target.value)}
                                                id="lname"
                                                name="lname"
                                                type="lname"
                                                placeholder='enter first name'
                                                required
                                                className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className=' flex gap-5 justify-between'>
                                    <div className=' w-full'>
                                        <label htmlFor="mobile" className="block text-lg font-medium leading-6 text-gray-900">
                                            Mobile No.
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={mobile}
                                                onChange={ev => setMobile(ev.target.value)}
                                                id="mobile"
                                                name="mobile"
                                                type="mobile"
                                                placeholder='enter mobile no.'
                                                required
                                                className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className=' w-full'>
                                        <label htmlFor="regId" className="block text-lg font-medium leading-6 text-gray-900">
                                            Registration ID
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={regid}
                                                onChange={ev => setRegid(ev.target.value)}
                                                id="regId"
                                                name="regId"
                                                type="regId"
                                                placeholder='enter regId'
                                                required
                                                className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={email}
                                            onChange={ev => setEmail(ev.target.value)}
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder='enter email address'
                                            autoComplete="email"
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="text-lg block font-medium leading-6 text-gray-900">
                                        Password
                                    </label>

                                    <div className="mt-2">
                                        <input
                                            value={password}
                                            onChange={ev => setPassword(ev.target.value)}
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="mb-9 block w-full rounded-md border-0 p-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddFaculty