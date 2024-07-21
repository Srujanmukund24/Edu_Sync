import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import { useCon } from '../../UserContext';
import { FetchBatchData, FetchDivisionData, FetchMentorGroupByTeacher } from '../ReusableComponents/Data';

const FacultyDashboard = () => {
    const { User, removeUserFromLS } = useCon();
    const [value, onChange] = useState(new Date());
    const [groupData, setGroupData] = useState([]);
    const [batchData, setBatchData] = useState([]);
    const [batchIdsAndSubjects, setDivIdsAndSubjects] = useState(User.batch);
    const [batchWithName, setBatchWithName] = useState([]);
    const [divisionData, setDivisionData] = useState([]);
    const [divIdsAndSubjects, setDivIdsAndSubjects2] = useState(User.division);
    const [divisionsWithName, setDivisionsWithName] = useState([]);


    useEffect(() => {
      // setDivIdsAndSubjects(User.divsion);
      const fetchData = async () => {
        try {
          const data = await FetchMentorGroupByTeacher();
          const data2 = await FetchBatchData();
          const data3 = await FetchDivisionData();
        if (data3) { setDivisionData(data3); }
          if (data2) { setBatchData(data2); }
          if (data) { setGroupData(data); }
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };
      fetchData();
    }, []);
   
    useEffect(() => {
        const divisionsWithName = divIdsAndSubjects.map(divisionID => {
          const division = divisionData.find(division => division._id === divisionID.divID);
          return {
              divisionName: division?.division,
              divID:division?._id,
              CCID:division?.CCID,
              year:division?.year,
              subject:divisionID?.subject
          };
      });
      
      setDivisionsWithName(divisionsWithName);
    
      }, [divisionData]);


    // console.log("brofre",batchData);
    useEffect(() => {
      const batchWithName = batchIdsAndSubjects.map(batchID => {
        const batch = batchData.find(batch => batch._id === batchID.batchID);
        return {
            batchName: batch?.name,
            batchID:batch?._id,
            TGID:batch?.TGID,
            subject:batchID?.subject
        };
    });
    
    setBatchWithName(batchWithName);
  
    }, [batchData]);
    return (
      <div className=" flex">
        <SideBar />
        <div className="flex-grow relative m-4 max-w-full w-full flex">
          <div className="overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-0 rounded-md absolute p-5 bg-gray-100 border flex-grow">
            <div className=" text-lg">
              <main className="p-6 sm:p-10 space-y-6">
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                  <div className="mr-6">
                    <h1 className="text-4xl font-bold text-indigo-800 mb-2">
                      {" "}
                      <HomeIcon className=" space-x-4 " /> Dashboard
                    </h1>
                  </div>
                  <button
                    onClick={removeUserFromLS}
                    className="mr-6 flex p-1 pr-5 pl-5 hover:bg-indigo-500 bg-indigo-600 rounded-md justify-center items-center gap-2"
                  >
                    <h2 className=" text-white font-semibold text-xl ml-0.5 text-decoration-font: italic ">
                      {User.fname}
                    </h2>
                    <LogoutIcon
                      className=" text-white cursor-pointer  hover:scale-100 transition-all "
                      fontSize="large"
                    />
                  </button>
                </div>
                <section className="grid md:grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-blue-100 rounded-full mr-6">
                      <svg
                        aria-hidden="true"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-2xl font-bold">
                        {divisionsWithName.length}
                      </span>
                      <span className="block text-gray-500">Divisons </span>
                    </div>
                  </div>
                  <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-blue-100 rounded-full mr-6">
                      <svg
                        aria-hidden="true"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                          fill="#fff"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-2xl font-bold">
                        {batchWithName.length}
                      </span>
                      <span className="block text-gray-500">Batches </span>
                    </div>
                  </div>
                  <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-blue-100 rounded-full mr-6">
                      <svg
                        aria-hidden="true"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-2xl font-bold">
                        {groupData.length}
                      </span>
                      <span className="block text-gray-500">
                        Mentorshipgrpss
                      </span>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="flex space-x-5">
                    <div className="flex flex-col space-y-4 w-2/6">
                      <div className="bg-white h-[17rem] rounded-xxl shadow-lg">
                        <Calendar onChange={onChange} value={value} />
                      </div>
                    </div>
                    <div className="bg-white h-[17rem] w-full rounded-xl shadow-lg flex flex-col  pt-3">
                      <div className="flex px-3">
                        {open && (
                          <ReplyIcon
                            onClick={() => setOpen(false)}
                            className="cursor-pointer"
                          />
                        )}
                        <h1 className="font-bold text-xl w-full text-center text-indigo-500">
                          Notices
                        </h1>
                      </div>
                      <div className="mx-5 mt-5 space-y-3 overflow-y-auto h-[12rem]">
                        Notice will be displayed here
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FacultyDashboard