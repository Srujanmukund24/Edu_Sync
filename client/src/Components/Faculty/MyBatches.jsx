import React, { useEffect, useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import TanStackTable from '../ReusableComponents/Table'
import { FetchBatchData, FetchDivisionData, FetchTeacherData } from "../ReusableComponents/Data"
import { useCon } from '../../UserContext';

const MyBatches = () => {
  const { User } = useCon();
  const [batchData, setBatchData] = useState([]);
  const [batchIdsAndSubjects, setDivIdsAndSubjects] = useState(User.batch);
  const [batchWithName, setBatchWithName] = useState([]);


  useEffect(() => {
    // setDivIdsAndSubjects(User.divsion);
    const fetchData = async () => {
      try {
        const data2 = await FetchBatchData();
        if (data2) { setBatchData(data2); }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, []);

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
  // console.log("divison data filtered", batchWithName);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-grow relative m-4 max-w-full w-full flex ">
        <div className='sm:overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-0 rounded-md absolute p-5 bg-gray-100 border flex-grow'>
          <div className=' text-lg p-6 sm:p-10 space-y-6'>
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
              <div className="mr-6">
                <h1 className="text-4xl font-bold text-indigo-800 mb-2"> My Batches</h1>
              </div>
              <button className="mr-6 flex p-1 pr-5 pl-5 hover:bg-indigo-500 bg-indigo-600 rounded-md justify-center items-center gap-2">
                <h2 className=" text-white font-semibold text-xl ml-0.5 text-decoration-font: italic ">{User.fname}</h2>
                <LogoutIcon className=" text-white cursor-pointer  hover:scale-100 transition-all " fontSize="large" />
              </button>

            </div>
          </div>
          <section className="flex-grow flex justify-center items-center flex-col h-4/5 bg-gray-100 rounded-md ">
            <div className="flex-grow relative mt-2 max-w-full w-full">
              <div className='overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-2 absolute p-5 bg-white border mb-5 w-full'>
                <TanStackTable USERS={batchWithName} type={"mybatches"} /> 
                {/* here proper data should be passed directly the user.divisions ok  */}
              </div>
            </div>
          </section>
        </div>
      </div>

    </div>
  )
}

export default MyBatches