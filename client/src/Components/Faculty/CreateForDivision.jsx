import React, { useEffect, useState } from "react";
import SideBar from "../ReusableComponents/SideBar";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import { useCon } from "../../UserContext";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { 
  FetchMyDivisions,
  FetchStudentDataByDivision,
} from "../ReusableComponents/Data";
import axios from "axios";
import { toast } from "react-toastify";

const CreateForDivision = () => {
  const { User } = useCon();
  const [division, setDivision] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [students, setStudents] = useState(null);
  const [problemStatement, setProblemStatement] = useState("");


  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await FetchMyDivisions();
      console.log("Fetched divisions:", res);
      if (res ) {
        setDivision(res);
      }
    } catch (error) {
      console.error("Error fetching divisions:", error.response || error);
    }
  };

  fetchData();
}, []); // Fetch divisions only once when component mounts

useEffect(() => {
  const fetchDivisionData = async () => {
    try {
      console.log("Selected Division:", selectedDivision);
      if (selectedDivision) {
        const response = await FetchStudentDataByDivision(selectedDivision);
        if (response ) {
          setStudents(response);
          console.log(response);
        }
      }
    } catch (error) {
      console.error("Error fetching division data:", error.response || error);
    }
  };

  fetchDivisionData();
}, [selectedDivision]);  



const createAssignment = async () => {
  try {
     
    if (!students || students.length === 0) {
      console.error("No students selected.");
      toast.error("No students selected")
      return;
    }
    if (problemStatement === "") {
      console.error("Write problem statement");
      toast.error("Write problem statement")
      return;
    }

    const assignmentData = {
      studentIds: students,  
      problemStatement: problemStatement,
    };

    const response = await axios.post("/createAssignment", assignmentData, {
      headers: {
        "Content-Type": "application/json", 
      },
    });

    if (response.status === 200) {
      console.log("Assignment created successfully:", response.data);
      toast.success("Assignment Added");

      
      setSelectedDivision(null);
      setProblemStatement(""); 
    } else {
      console.error(
        "Error creating assignment:",
        response.data && response.data.message
      );
    }
  } catch (error) {
    console.error("Error creating assignment:", error);
    toast.error("not uploaded server error")
  }
};



  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-grow relative m-4 max-w-full w-full flex ">
        <div className="overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-0 rounded-md absolute p-5 bg-gray-100 border flex-grow">
          <div className="text-lg h-5/6">
            <main className="p-6 sm:p-10 space-y-6 ">
              <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div className="mr-6">
                  <h1 className="text-4xl font-bold text-indigo-800 mb-2">
                    Create Assignment for the Division
                  </h1>
                </div>
                <button className="mr-6 flex p-1 pr-5 pl-5 hover:bg-indigo-500 bg-indigo-600 rounded-md justify-center items-center gap-2">
                  <h2 className="text-white font-semibold text-xl ml-0.5 text-decoration-font: italic ">
                    {User.fname}
                  </h2>
                  <LogoutIcon
                    className="text-white cursor-pointer hover:scale-100 transition-all "
                    fontSize="large"
                  />
                </button>
              </div>
              <div className="h-full relative mt-10 sm:mx-auto sm:w-4/5">
                <form className="sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-xl space-y-6 sm:p-10 sm:bg-white">
                  <div className="w-full">
                    <label
                      htmlFor="subject"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Problem Statement
                    </label>
                    <div className="mt-2">
                      <input
                        value={problemStatement} // Bind the value to problemStatement state
                        id="name"
                        name="name"
                        type="text"
                        placeholder="type the problem statement"
                        required
                        onChange={(e) => setProblemStatement(e.target.value)} // Update problemStatement state on change
                        className="p-2 pl-3 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="teacher"
                      className="block text-lg font-medium leading-6 text-gray-900 pb-2"
                    >
                      Select Division for the Assignment
                    </label>
                    <Combobox
                      value={selectedDivision}
                      onChange={setSelectedDivision}
                    >
                      <div className="relative mt-1">
                        <div className="relative border border-gray-200 block w-full rounded-md text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-5">
                          <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-700 focus:ring-0"
                            placeholder="Select the Division"
                          />
                          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </Combobox.Button>
                        </div>
                        <Combobox.Options className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto sm:text-sm sm:leading-5">
                          {division && division.length > 0 ? (
                            division.map((div, index) => (
                              <Combobox.Option
                                key={index}
                                value={div.divID}
                                className={({ active }) =>
                                  `${
                                    active
                                      ? "text-white bg-indigo-600"
                                      : "text-gray-900"
                                  }
          cursor-pointer select-none relative py-2 pl-3 pr-9`
                                }
                              >
                                {div.divName}
                              </Combobox.Option>
                            ))
                          ) : (
                            <Combobox.Option disabled>
                              No divisions available
                            </Combobox.Option>
                          )}
                        </Combobox.Options>
                      </div>
                    </Combobox>
                  </div>
                  <button
                    type="button"
                    onClick={createAssignment}
                    className="text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create
                  </button>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForDivision;
