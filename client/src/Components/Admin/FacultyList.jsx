import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import { FetchTeacherData } from "../ReusableComponents/Data"
import TanStackTable from '../ReusableComponents/Table'

const FacultyList = () => {
    const [teacherData, setTeacherData] = useState([]);
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


    console.log("Teacher Data:", teacherData);


    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow p-3 '>
                <div className='flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md sm:p-5'>
                    <div>
                        <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Faculties
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-5 max-w-full w-full ">
                        <div className='overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-2 absolute p-5 bg-white border w-full'>
                            <TanStackTable USERS={teacherData} type={"faculty"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacultyList