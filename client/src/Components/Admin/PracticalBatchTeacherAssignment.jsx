import React, { Fragment, useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FetchBatchData, FetchDivisionData, FetchPracticalData, FetchSubjectData, FetchTeacherData } from '../ReusableComponents/Data'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const PracticalBatchTeacherAssignment = () => {
    const [year, setYear] = useState('');

    // for Division dropdown ---------------------------------------------------------------------------------------------------------
    const [divisionData, setDivisionData] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState({ division: "", year: "" })
    const [queryDivision, setQueryDivision] = useState('')

    const filteredDivision =
        queryDivision === ''
            ? divisionData
            : divisionData.filter((division) =>
                `${division.year} ${division.division}`
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(queryDivision.toLowerCase().replace(/\s+/g, ''))
            )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchDivisionData();
                setDivisionData(data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };
        fetchData();
    }, []);
    // -------------------------------------------------------------------------------------------------------------------------

    // for Teacher dropdown ---------------------------------------------------------------------------------------------------------
    const [teacherData, setTeacherData] = useState([]);
    const [selected, setSelected] = useState({ regid: "", fname: "", lname: "" })
    const [query, setQuery] = useState('')

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

    // for Practical dropdown ---------------------------------------------------------------------------------------------------------
    const [subjectData, setSubjectData] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState({ practicalName: "" })
    const [querySubject, setQuerySubject] = useState('')

    const filteredSubject =
        querySubject === ''
            ? subjectData
            : subjectData.filter((subject) =>
                `${subject.practicalName}`
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(querySubject.toLowerCase().replace(/\s+/g, ''))
            )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchPracticalData();
                setSubjectData(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };
        fetchData();
    }, []);
    // -------------------------------------------------------------------------------------------------------------------------

    // for Batch dropdown ---------------------------------------------------------------------------------------------------------
    const [batchData, setBatchData] = useState([]);
    const [currentBatchData, setCurrentBatchData] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState({name:"" , TGID:""});
    const [queryBatch, setQueryBatch] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchBatchData();
                if (data) { setBatchData(data); }

            } catch (error) {
                console.error('Error fetching Batch data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if(selectedDivision.batches){
            const batchIdsInDivision = [...selectedDivision.batches];
            if(batchData && batchIdsInDivision){
                const filteredBatchData = batchData.filter(batch => batchIdsInDivision.includes(batch._id));

                if (JSON.stringify(filteredBatchData) !== JSON.stringify(currentBatchData)) {
                    setCurrentBatchData(filteredBatchData);
                    setSelectedBatch({name:"" , TGID:""});
                }
            }
        }
    }, [selectedDivision,setSelectedDivision]);

    const filteredBatch =
        queryBatch === ''
            ? currentBatchData
            : currentBatchData.filter((batch) =>
                batch.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(queryBatch.toLowerCase().replace(/\s+/g, ''))
            )
    // ------------------------------------------------------------------------------------------------------------------------



    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = "/addStudentsPracticalInfo";

        // Perform register operation using axios
        try {
            
            if (selected && selectedDivision && selectedBatch && selectedSubject) {
                const { data } = await axios.post(url, { teacher_id : selected._id, batch_id : selectedBatch._id, practicalName : selectedSubject.practicalName, year : year });
                // Redirect to admin dashboard on successful login
                toast.success("Assignment Successfull");
                setSelectedDivision({ division: "", year: "" });
                setSelectedSubject({ practicalName: "" });setYear('');setSelected({ regid: "", fname: "", lname: "" });
                setSelectedBatch({name:"" , TGID:""})
            } else {
                toast.info("Select all Filled");
            }
        } catch (error) {
            console.error('Registration failed', error);
            toast.error(error.response.data);
        }
    }

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow flex flex-col p-3 '>
                <div className='flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md '>
                    <div>
                        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Practical Batch Teacher Assignment
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
                        <div className='sm:p-10 no-scrollbar overflow-y-scroll absolute top-0 left-0 right-0 bottom-10 sm:bg-white sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-xl '>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className=' w-full'>
                                    <label htmlFor="year" className="block text-lg font-medium leading-6 text-gray-900">
                                        Year
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={year}
                                            onChange={ev => { setQueryDivision(ev.target.value), setSelectedDivision({ division: "", year: "" }), setYear(ev.target.value) }}
                                            id="year"
                                            name="year"
                                            type="year"
                                            placeholder='enter year'
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <label htmlFor="division" className="block text-lg font-medium leading-6 text-gray-900 pb-2">
                                        Select Division
                                    </label>
                                    <div>
                                        <Combobox value={selectedDivision} onChange={setSelectedDivision}>
                                            <div className="relative mt-1 ">
                                                <div className="relative border border-gray-200 block w-full rounded-md text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                    <Combobox.Input
                                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:ring-0"
                                                        displayValue={(division) => `${division.year} ${division.division}`}
                                                        onChange={(event) => setQueryDivision(event.target.value)}
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
                                                    afterLeave={() => setQueryDivision('')}
                                                >
                                                    <Combobox.Options className=" z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                        {filteredDivision.length === 0 && queryDivision !== '' ? (
                                                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                                Nothing found.
                                                            </div>
                                                        ) : (
                                                            filteredDivision.map((division) => (
                                                                <Combobox.Option
                                                                    key={division._id}
                                                                    className={({ active }) => ` relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`
                                                                    }
                                                                    value={division}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`} >
                                                                                {`${division.year} ${division.division}`}
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
                                        Select Batch 
                                    </label>
                                    <div className=' z-0'>
                                        <Combobox value={selectedBatch} onChange={setSelectedBatch}>
                                            <div className="relative mt-1 ">
                                                <div className="relative border border-gray-200 block w-full rounded-md text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                    <Combobox.Input
                                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:ring-0"
                                                        displayValue={(batch) =>
                                                            batch.name
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
                                                    <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                        {filteredBatch.length === 0 && queryBatch !== '' ? (
                                                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                                Nothing found.
                                                            </div>
                                                        ) : (
                                                            filteredBatch.map((batch) => (
                                                                <Combobox.Option
                                                                    key={batch._id}
                                                                    className={({ active }) =>`  relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900' }`}
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

                                <div className="w-full">
                                    <label htmlFor="teacher" className="block text-lg font-medium leading-6 text-gray-900 pb-2">
                                        Select Teacher
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
                                        Select Practical
                                    </label>
                                    <div>
                                        <Combobox value={selectedSubject} onChange={setSelectedSubject}>
                                            <div className="relative mt-1 ">
                                                <div className="relative border border-gray-200 block w-full rounded-md text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                    <Combobox.Input
                                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:ring-0"
                                                        displayValue={(subject) => `${subject ? subject.practicalName : ""}`}
                                                        onChange={(event) => setQuerySubject(event.target.value)}
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
                                                    afterLeave={() => setQuerySubject('')}
                                                >
                                                    <Combobox.Options className=" z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                        {filteredSubject.length === 0 && querySubject !== '' ? (
                                                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                                Nothing found.
                                                            </div>
                                                        ) : (
                                                            filteredSubject.map((subject) => (
                                                                <Combobox.Option
                                                                    key={subject._id}
                                                                    className={({ active }) => ` relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`
                                                                    }
                                                                    value={subject}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`} >
                                                                                {`${subject.practicalName}`}
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
                                    Assign
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PracticalBatchTeacherAssignment