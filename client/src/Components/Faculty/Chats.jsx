import React, { useState, useEffect } from "react";
import { useCon } from "../../UserContext";
import SideBar from "../ReusableComponents/SideBar";
import axios from "axios";
import Conversation from "./Conversation";
import { useLocation } from "react-router";

function TeacherChats() {
  const { User } = useCon();
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/teacher/myChats");
        if (response && response.data) {
          setChats(response.data);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchData();
  }, []);

  const handleChatItemClick = (chatId) => {
    setActiveChatId(chatId);
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-col flex-grow relative m-4 max-w-full w-full flex">
        <div className="flex justify-between items-center bg-blue-900 text-white px-5 py-5">
          <div className="font-semibold text-xl">GoingChat</div>
          <div className="w-1/2">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-full bg-blue-200 text-black py-2 px-4 w-full"
            />
          </div>
          <div className="h-12 w-12 bg-white rounded-full text-blue-900 font-semibold flex items-center justify-center">
            {User.fname}
          </div>
        </div>
        <div className="flex flex-grow">
          <div className="w-1/4 border-r overflow-y-auto bg-white">
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`flex items-center px-4 py-3 border-b ${
                  activeChatId === chat.studentId ? "bg-gray-200" : ""
                }`}
                onClick={() => handleChatItemClick(chat.studentId)}
              >
                <div className="flex-grow">
                  <div className="text-lg font-semibold">{chat.studName}</div>
                </div>
              </div>
            ))}
          </div>
          {activeChatId && (
            <div className="flex-grow bg-white">
              <Conversation
                teacherId={User.teacherId}
                studentId={activeChatId}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherChats;
