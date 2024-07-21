import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import { FetchBatchData, FetchDivisionData, FetchStudentData } from "../ReusableComponents/Data"
import TanStackTable from '../ReusableComponents/Table'

const StudentList = () => {
    const [studentData, setStudentData] = useState([]);
    const [divisionData, setDivisionData] = useState([]);
    const [batchData, setBatchData] = useState([]);
    const [studentWithName, setStudentWithName] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchStudentData();
                const data1 = await FetchBatchData();
                const data2 = await FetchDivisionData();
                if (data) { setStudentData(data); }
                if (data1) { setBatchData(data1); }
                if (data2) { setDivisionData(data2); }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchData(); 
    }, []);
    
    useEffect(() => {
        // Check if both divisionData and batchData are populated
        if (divisionData.length > 0 && batchData.length > 0) {
            const studentDataWithNames = studentData.map(student => {
                const division = divisionData.find(division => division._id === student.division);
                const divisionName = division ? division.division : '';
    
                const batch = batchData.find(batch => batch._id === student.batch);
                const batchName = batch ? batch.name : '';
            
                return {
                    division: divisionName,
                    batch: batchName,
                    fname: student.fname,
                    lname: student.lname,
                    regid: student.regid,
                    mobile: student.mobile,
                    email : student.email,
                };
            });
            
            setStudentWithName(studentDataWithNames);
        }
    }, [divisionData, batchData, studentData]);
        
    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow p-3 '>
                <div className='flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md sm:p-5'>
                    <div>
                        <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Students
                        </h2>
                    </div>

                    <div className="flex-grow relative mt-5 max-w-full w-full ">
                        <div className='overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-2 absolute p-5 bg-white border w-full'>
                            <TanStackTable USERS={studentWithName} type={"student"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentList