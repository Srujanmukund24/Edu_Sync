import React, { Fragment, useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FetchBatchData, FetchDivisionData, FetchTeacherData } from '../ReusableComponents/Data'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'



const AddDivision = () => {
    const [division, setDivision] = useState('');
    const [year, setYear] = useState('');

    // for CC dropdown ---------------------------------------------------------------------------------------------------------
    const [teacherData, setTeacherData] = useState([]);
    const [selected, setSelected] = useState({ regid: "", fname: "", lname: "" })
    const [query, setQuery] = useState('')

    // console.log("teacher : ", selected)

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
    // -------------------------------------------------------------------------------------------------------------------------


    // for Batch dropdown ---------------------------------------------------------------------------------------------------------
    const [batchData, setBatchData] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState([])
    const [queryBatch, setQueryBatch] = useState('')
    const [divisionData, setDivisionData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchBatchData();
                const data1 = await FetchDivisionData();
                if(data1){setDivisionData(data1);}
                if(data){setBatchData(data);}
                
            } catch (error) {
                console.error('Error fetching Batch data:', error);
            }
        };
        fetchData();        
    }, []);

    useEffect(() => {
        const filteredBatch = batchData.filter(batch => {
            // Check if the batch ID exists in any division's batches array
            return !divisionData.some(division => division.batches.includes(batch._id));
        });
        if (JSON.stringify(filteredBatch) !== JSON.stringify(batchData)) {
            setBatchData(filteredBatch);
        }
    }, [batchData, divisionData, selectedBatch]);

    const filteredBatch =
    queryBatch === ''
        ? batchData
        : batchData.filter((batch) =>
            batch.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(queryBatch.toLowerCase().replace(/\s+/g, ''))
        )
    // ------------------------------------------------------------------------------------------------------------------------



    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = "/adddivision";

        try {
            if(selected.regid.length && selectedBatch.length){
                const batchIds = selectedBatch.map(batch => batch._id);
                const response = await axios.post(url, { division : division, year : year, teacherId : selected._id, batchIds : batchIds});  
                setDivision(''); setYear('');setSelected({ regid: "", fname: "", lname: "" });setSelectedBatch([]);
                toast.success("Add Division Successfully");
            }else if(selected.regid.length == 0){
                toast.info("Select Teacher")
            }else if(selectedBatch.length == 0){
                toast.info("Select At least One Batch");
            }
        } catch (error) {
            console.error('Addition failed', error);
            if(error.response.status == 400){
                toast.error('Division with the same name already exists');
            }
        }
    }

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow flex flex-col p-3 '>
                <div className='flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md '>
                    <div>
                        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Add Division
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
                        <div className='sm:p-10 no-scrollbar overflow-y-scroll absolute top-0 left-0 right-0 bottom-10 sm:bg-white sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-xl '>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className=' w-full'>
                                    <label htmlFor="division" className="block text-lg font-medium leading-6 text-gray-900">
                                        Division Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={division}
                                            onChange={ev => setDivision(ev.target.value)}
                                            id="division"
                                            name="division"
                                            type="division"
                                            placeholder='enter first name'
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
                                            placeholder='enter first name'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label htmlFor="teacher" className="block text-lg font-medium leading-6 text-gray-900 pb-2">
                                        Class Coordinator Name
                                    </label>
                                    <div>
                                        <Combobox value={selected} onChange={setSelected}>
                                            <div className="relative mt-1 ">
                                                <div className="relative border border-gray-200 block w-full rounded-md text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                    <Combobox.Input
                                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:ring-0"
                                                        displayValue={(teacher) => `${teacher.regid} ${teacher.fname} ${teacher.lname}`}
                                                        onChange={(event) => setQuery(event.target.value)}
                                                        placeholder='Select'
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
                                                    <Combobox.Options className=" z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                        {filteredPeople.length === 0 && query !== '' ? (
                                                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                                Nothing found.
                                                            </div>
                                                        ) : (
                                                            filteredPeople.map((teacher) => (
                                                                <Combobox.Option
                                                                    key={teacher._id}
                                                                    className={({ active }) => ` relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`
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

                                </div>

                                <div className="w-full">
                                    <label htmlFor="teacher" className="block text-lg font-medium leading-6 text-gray-900 pb-2">
                                        Select Batches for Division
                                    </label>
                                    <div className=' z-0'>
                                        <Combobox value={selectedBatch} onChange={setSelectedBatch} multiple>
                                            <div className="relative mt-1 ">
                                                <div className="relative border border-gray-200 block w-full rounded-md text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                    <Combobox.Input
                                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:ring-0"
                                                        displayValue={(batch) =>
                                                            batch.map((batch) => batch.name).join(", ")
                                                        }
                                                        onChange={(event) => setQueryBatch(event.target.value)}
                                                        placeholder='Select'
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
                                                    afterLeave={() => setQueryBatch('')}
                                                >
                                                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                        {filteredBatch.length === 0 && queryBatch !== '' ? (
                                                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                                Nothing found.
                                                            </div>
                                                        ) : (
                                                            filteredBatch.map((batch) => (
                                                                <Combobox.Option
                                                                    key={batch._id}
                                                                    className={({ selected, active }) =>`  relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900' }`}
                                                                    value={batch}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`} >
                                                                                {batch.name}
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

export default AddDivision