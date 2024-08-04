 
import SideBar from '../ReusableComponents/SideBar';
import TanStackTable from '../ReusableComponents/Table';
import React, { useEffect, useState } from 'react'
import { FetchMySubjects } from '../ReusableComponents/Data';

const Subject = () => {
  const [MySubject ,setMySubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchMySubjects();
        console.log(data);
        if (data) {
          setMySubjects(data);
        }
      } catch (error) {
        console.error("Error fetching subjects data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow p-3 ">
        <div className="flex-grow flex justify-center items-center flex-col h-full bg-gray-100 rounded-md sm:p-5">
          <div>
            <h2 className=" text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Subject Information
            </h2>
          </div>

          <div className="flex-grow relative mt-5 max-w-full w-full ">
            <div className="overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-2 absolute p-5 bg-white border w-full">
              <TanStackTable USERS={MySubject} type={"MySubjects"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subject
