import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import { FetchBatchData, FetchDivisionData, FetchTeacherData } from "../ReusableComponents/Data"
import TanStackTable from '../ReusableComponents/Table'

const DivisionList = () => {
    const [divisionData, setDivisionData] = useState([]);
    const [batchData, setBatchData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [divisionWithNames, setDivisionWithNames] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchDivisionData();
                const data1 = await FetchBatchData();
                const data2 = await FetchTeacherData();
                if(data){setDivisionData(data);}
                if(data1){setBatchData(data1);}
                if(data2){setTeacherData(data2);}
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchData(); 
    }, []);

    useEffect(() => {
        const divisionDataWithNames = divisionData.map(division => {
            // Replace batch IDs with batch names
            const batchesWithNames = division.batches.map(batchId => {
                const batch = batchData.find(batch => batch._id === batchId);
                return batch ? batch.name : '';
            });
        
            // Replace teacher ID with combined first name and last name
            const teacher = teacherData.find(teacher => teacher._id === division.CCID);
            const teacherName = teacher ? `${teacher.fname} ${teacher.lname}` : '';
        
            return {
                division: division.division,
                year: division.year,
                CCID: teacherName,
                batches: batchesWithNames
            };
        });
        
        setDivisionWithNames(divisionDataWithNames);

    }, [divisionData, batchData, teacherData]);
    
   

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow p-3 '>
                <div className='flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md sm:p-5'>
                    <div>
                        <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Divisions
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-5 max-w-full w-full ">
                        <div className='overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-2 absolute p-5 bg-white border w-full'>
                            <TanStackTable USERS={divisionWithNames} type={"division"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DivisionList