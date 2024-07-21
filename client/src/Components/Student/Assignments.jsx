import React, { useEffect, useState } from "react";
import SideBar from "../ReusableComponents/SideBar";
import {
  FetchCompletedAssignments,
  FetchIncompletedAssignments,
} from "../ReusableComponents/Data";
import TanStackTable from "../ReusableComponents/Table";
import axios from "axios";
import { storage } from "../ReusableComponents/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

const Assignments = () => {
  const [CompletedAssignments, setCompletedAssignments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [progresspercent, setProgresspercent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchCompletedAssignments();
        const data2 = await FetchIncompletedAssignments();
        if (data) {
          setCompletedAssignments(data);
        }
        if (data2) {
          setAssignments(data2);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFileUpload = async (event, assignmentId) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateAssignment(assignmentId, downloadURL);
        });
      }
    );
  };

  const updateAssignment = async (assignmentId, uploadedDocLink) => {
    try {
      await axios.put("/updateAssignment", {
        assignmentID: assignmentId,
        uploadLink: uploadedDocLink,
        isCompleted: true,
      });
      toast.success("Assignment submited");
      setAssignments(null);
    } catch (error) {
      console.error("Error updating assignment:", error);
      toast.error("assignment not submited");
    }
  };

  const redirectToLink = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="flex ">
      <SideBar />
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-4">Incomplete Assignments</h1>
        <div className="overflow-x-auto mb-6 w-full flex justify-center items-center">
          <table className="min-w bg-white border rounded-lg ">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border px-4 py-2">Problem Statement</th>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Uploaded Document Link</th>
                <th className="border px-4 py-2">Upload</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id}>
                  <td className="border px-4 py-2">
                    {assignment.problemstatement}
                  </td>
                  <td className="border px-4 py-2">{assignment.subject}</td>
                  <td className="border px-4 py-2">
                    {assignment.uploaded_doc_link.length > 0 && (
                      <button
                        className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-blue-100"
                        onClick={() =>
                          redirectToLink(assignment.uploaded_doc_link)
                        }
                      >
                        View Document
                      </button>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <form
                      onSubmit={(event) =>
                        handleFileUpload(event, assignment._id)
                      }
                    >
                      <input type="file" className="mb-2" />
                      <button
                        type="submit"
                        className="bg-white text-blue-900 px-4 py-1 rounded hover:bg-blue-100"
                      >
                        Upload
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Completed Assignments</h2>
          <div className="overflow-y-scroll h-96 bg-white rounded-md p-6">
            <TanStackTable
              USERS={CompletedAssignments}
              type={"CompletedAssignments"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
