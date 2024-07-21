import React, { Fragment, useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FetchTeacherData } from '../ReusableComponents/Data'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'



const AddBatch = () => {
    const [batch, setBatch] = useState('');
    const [teacherData, setTeacherData] = useState([]);
    const [selected, setSelected] = useState({ regid: "Select", fname: "", lname: "" })
    const [query, setQuery] = useState('')
    console.log("teacher : ", selected)

    const filteredPeople =
        query === ''
            ? teacherData
            : teacherData.filter((teacher) =>
                `${teacher.regid} ${teacher.fname} ${teacher.lname}`
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchTeacherData();
                setTeacherData(data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };
        fetchData();
    }, []);



    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = "/addbatches";
        // console.log(url);

        // Perform register operation using axios
        try {
            if (selected._id) {
                const { data } = await axios.post(url, { name: batch, teacherID: selected._id });
                // Redirect to admin dashboard on successful login
                // console.log("Teacher ", data);
                setBatch(''); setSelected({ regid: "Select", fname: "", lname: "" });
                toast.success("Batch Added Successfully");
            }else{
                toast.info("Select Teacher");
            }

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
                <div className=' flex justify-center items-center flex-col h-full bg-gray-100 rounded-md '>
                    <div>
                        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Add Batch
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
                        <div className='no-scrollbar overflow-y-scroll absolute top-0 left-0 right-0 bottom-10 '>
                            <form className=" sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-xl space-y-6 sm:p-10  sm:bg-white" onSubmit={handleSubmit}>
                                <div className=' w-full'>
                                    <label htmlFor="batch" className="block text-lg font-medium leading-6 text-gray-900">
                                        Name of The Batch
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={batch}
                                            onChange={ev => setBatch(ev.target.value)}
                                            id="batch"
                                            name="batch"
                                            type="batch"
                                            placeholder='eg. L1, B1,..'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label htmlFor="teacher" className="block text-lg font-medium leading-6 text-gray-900 pb-2">
                                        Select Teacher Gaurdian
                                    </label>
                                    <Combobox value={selected} onChange={setSelected}>
                                        <div className="relative mt-1 ">
                                            <div className="relative border border-gray-200 block w-full rounded-md text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <Combobox.Input
                                                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:ring-0"
                                                    displayValue={(teacher) => `${teacher.regid} ${teacher.fname} ${teacher.lname}`}
                                                    onChange={(event) => setQuery(event.target.value)}
                                                />
                                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </Combobox.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                                afterLeave={() => setQuery('')}
                                            >
                                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                    {filteredPeople.length === 0 && query !== '' ? (
                                                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                            Nothing found.
                                                        </div>
                                                    ) : (
                                                        filteredPeople.map((teacher) => (
                                                            <Combobox.Option
                                                                key={teacher._id}
                                                                className={({ active }) =>
                                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                                    }`
                                                                }
                                                                value={teacher}
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`} >
                                                                            {`${teacher.regid} ${teacher.fname} ${teacher.lname}`}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-indigo-600'}`}>
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Combobox.Option>
                                                        ))
                                                    )}
                                                </Combobox.Options>
                                            </Transition>
                                        </div>
                                    </Combobox>
                                </div>

                                <button
                                    type="submit"
                                    className="text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Batch
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddBatch