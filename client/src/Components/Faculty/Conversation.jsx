import React, { useState, useEffect } from "react";
import axios from "axios";

function Conversation({ teacherId, studentId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, [studentId]); // Fetch messages whenever studentId changes

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/getteacherchats/${studentId}`);
      if (response && response.data && response.data.chats) {
        setMessages(response.data.chats.chats);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post(`/teacherchats/${studentId}`, { message: newMessage });
      setNewMessage("");
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        {/* Display messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === "teacher" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`p-2 ${
                message.sender === "teacher" ? "bg-blue-200" : " bg-gray-200"
              } rounded-lg inline-block`}
            >
              {message.message}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        {/* Input field for new message */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        {/* Button to send message */}
        <button
          onClick={sendMessage}
          className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Conversation;
