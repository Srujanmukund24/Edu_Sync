import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
import { useCon } from "../../../UserContext";

const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { storeUserInLS } = useCon();

    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = "/loginStudent";

        try {
            const { data } = await axios.post(url, { email, password });
            storeUserInLS(data);
            navigate('/student/dashboard');
        } catch (error) {
            console.error('Login failed', error);
        }
    }


    return (
        <div className=' flex justify-center items-center flex-col h-dvh bg-gray-100'>
            <div>
                <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your student account
                </h2>

            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className='sm:p-10 sm:bg-white sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-lg shadow-md'>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">
                                email
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder='enter email'
                                    autoComplete="email"
                                    required
                                    className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="text-lg block font-medium leading-6 text-gray-900" >
                                Password
                            </label>

                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='enter password'
                                    autoComplete="current-password"
                                    required
                                    className="mb-9 block w-full rounded-md border-0 p-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>

                            <button
                                type="submit"
                                className="mt-5 text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default StudentLogin