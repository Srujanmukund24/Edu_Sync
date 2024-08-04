import React, { useState } from "react";
import SideBar from "../ReusableComponents/SideBar";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useCon } from "../../UserContext";

const StudentProfile = () => {
  const { User } = useCon();
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow relative m-4 max-w-full w-full flex">
        <div className="overflow-y-scroll no-scrollbar top-0 left-0 right-0 bottom-0 rounded-md absolute p-5 bg-gray-100 border flex-grow">
          <div className=" text-lg p-6 sm:p-10 space-y-6">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
              <div className="mr-6">
                <h1 className="text-4xl font-bold text-indigo-800 mb-2">
                  {" "}
                  <AccountCircleRoundedIcon
                    className=" space-x-4 m-2 "
                    fontSize="large"
                  />
                  Profile
                </h1>
              </div>
              <button className="mr-6 flex p-1 pr-5 pl-5 hover:bg-indigo-500 bg-indigo-600 rounded-md justify-center items-center gap-2">
                <h2 className=" text-white font-semibold text-xl ml-0.5 text-decoration-font: italic ">
                  {User.fname}
                </h2>
                <LogoutIcon
                  className=" text-white cursor-pointer  hover:scale-100 transition-all "
                  fontSize="large"
                />
              </button>
            </div>
            <main className="w-full">
              <div className="flex-grow relative mt-20 ">
                <div className="top-0 left-0 right-0 bottom-2 p-5 bg-white border ">
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-blue-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-medium text-blue-700 ">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {User.fname} {User.lname}
                        </dd>
                      </div>
                      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-medium text-blue-700">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {User.email}
                        </dd>
                      </div>
                      <div className="bg-blue-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-medium text-blue-700">Reg_id:</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {User.regid}
                        </dd>
                      </div>
                      <div className="bg-blue-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="font-medium text-blue-700">Mobile:</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {User.mobile}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
