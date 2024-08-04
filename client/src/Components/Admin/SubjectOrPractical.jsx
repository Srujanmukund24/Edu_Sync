import React, { Fragment, useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import axios from 'axios'
import { toast } from 'react-toastify'

const SubjectOrPractical = () => {
    const [subject, setSubject] = useState('');
    const [year, setYear] = useState('');
    const [practical, setPractical] = useState('');


    async function handleSubmitSubject(ev) {
        ev.preventDefault();
        const url = "/addSubject";
        try {
            const { data } = await axios.post(url, { subjectName : subject , year : year });
            toast.success("subject Added Successfully");
            setSubject('');setYear('');
        } catch (error) {
            console.error('Registration failed', error);
            toast.error(error.response.data);
        }
    }

    async function handleSubmitPractical(ev) {
        ev.preventDefault();
        const url = "/addPractical";
        try {
            const { data } = await axios.post(url, { practicalName : practical , year : year });
            toast.success("Practical Added Successfully");
            setPractical('');setYear('');
        } catch (error) {
            console.error('Registration failed', error);
            toast.error(error.response.data);
        }
    }

    
    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow flex flex-col p-3 '>
                <div className=' flex justify-center items-center flex-col h-full bg-gray-100 rounded-md '>
                    <div>
                        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Add Subject Or Practical For Particular Year
                        </h2>
                    </div>

                    <div className="h-full relative mt-10 sm:mx-auto sm:w-4/5">
                        <div className='no-scrollbar overflow-y-scroll absolute top-0 left-0 right-0 bottom-auto flex gap-5 '>
                            <form className=" sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-xl space-y-6 sm:p-10  sm:bg-white" onSubmit={handleSubmitSubject}>
                                <div className=' w-full'>
                                    <label htmlFor="subject" className="block text-lg font-medium leading-6 text-gray-900">
                                        Name of The Subject
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={subject}
                                            onChange={ev => setSubject(ev.target.value)}
                                            id="subject"
                                            name="subject"
                                            type="subject"
                                            placeholder='eg. DBMS, DSBDA, CC, etc..'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className=' w-full'>
                                    <label htmlFor="year" className="block text-lg font-medium leading-6 text-gray-900">
                                        Year
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={year}
                                            onChange={ev => setYear(ev.target.value)}
                                            id="year"
                                            name="year"
                                            type="year"
                                            placeholder='eg. TE, BE, SE, FE, etc'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Subject
                                </button>
                            </form>

                            <form className=" sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-xl space-y-6 sm:p-10  sm:bg-white" onSubmit={handleSubmitPractical}>
                                <div className=' w-full'>
                                    <label htmlFor="practical" className="block text-lg font-medium leading-6 text-gray-900">
                                        Name of The practical
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={practical}
                                            onChange={ev => setPractical(ev.target.value)}
                                            id="practical"
                                            name="practical"
                                            type="practical"
                                            placeholder='eg. LP1, LP2, DSBDAL, etc..'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className=' w-full'>
                                    <label htmlFor="year" className="block text-lg font-medium leading-6 text-gray-900">
                                        Year
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={year}
                                            onChange={ev => setYear(ev.target.value)}
                                            id="year"
                                            name="year"
                                            type="year"
                                            placeholder='eg. TE, BE, SE, FE, etc'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Practical
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SubjectOrPractical