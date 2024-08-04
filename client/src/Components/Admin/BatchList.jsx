import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import { FetchBatchData, FetchTeacherData } from "../ReusableComponents/Data"
import TanStackTable from '../ReusableComponents/Table'

const BatchList = () => {
    const [batchData, setBatchData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [batchesWithName, setBatchesWithName] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchBatchData();
                const data1 = await FetchTeacherData();
                if(data){setBatchData(data);}
                if(data1){setTeacherData(data1);}
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchData(); 
    }, []);

    useEffect(() => {
        const batchDataWithNames = batchData.map(batch => {
            // Replace teacher ID with combined first name and last name
            const teacher = teacherData.find(teacher => teacher._id === batch.TGID);
            const teacherName = teacher ? `${teacher.fname} ${teacher.lname}` : '';
            return {
                _id : batch._id,
                tgname : teacherName,
                name : batch.name,
            };
        });
        setBatchesWithName(batchDataWithNames);
    }, [batchData, teacherData]);

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow p-3 '>
                <div className='flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md sm:p-5'>
                    <div>
                        <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Batches
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-5 max-w-full w-full ">
                        <div className='overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-2 absolute p-5 bg-white border w-full'>
                            <TanStackTable USERS={batchesWithName} type={"batch"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BatchList