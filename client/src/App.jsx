import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useCon } from "./UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

import Login from "./Components/Login/Login";

// Admin
import AdminLogin from "./Components/Login/AdminLogin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AddFaculty from "./Components/Admin/AddFaculty";
import RemoveFaculty from "./Components/Admin/RemoveFaculty";
import FacultyList from "./Components/Admin/FacultyList";
import StudentList from "./Components/Admin/StudentList";
import AddDivision from "./Components/Admin/AddDivision";
import AddBatch from "./Components/Admin/AddBatch";
import BatchList from "./Components/Admin/BatchList";
import DivisionList from "./Components/Admin/DivisionList";
import AddStudent from "./Components/Admin/AddStudent";
import RemoveStudent from "./Components/Admin/RemoveStudent";
import SubjectOrPractical from "./Components/Admin/SubjectOrPractical";
import SubjectClassroomTeacherAssignment from "./Components/Admin/SubjectClassroomTeacherAssignment";
import PracticalBatchTeacherAssignment from "./Components/Admin/PracticalBatchTeacherAssignment";


// Faculty
import FacultyLogin from "./Components/Login/FacultyLogin/FacultyLogin";
import FacultyDashboard from "./Components/Faculty/FacultyDashboard";
import FacultyProfile from "./Components/Faculty/FacultyProfile";
import MyDivision from "./Components/Faculty/MyDivision";
import MyBatches from "./Components/Faculty/MyBatches";
import MentorshipGrps from "./Components/Faculty/MentorshipGrps";
import FacultyChat from "./Components/Faculty/Chats";


// Student
import StudentLogin from "./Components/Login/StudentLogin/StudentLogin";
import StudentDashboard from "./Components/Student/StudentDashboard";
import StudentProfile from "./Components/Student/StudentProfile";
import Chats from "./Components/Student/Chats";
import Subject from "./Components/Student/Subject";
import Assignments from "./Components/Student/Assignments"
import UpdateMarksAttendence from "./Components/Faculty/UpdateMarksAttendence";
import CreateForBatch from "./Components/Faculty/CreateForBatch";
import CreateForDivision from "./Components/Faculty/CreateForDivision";
import StudentListForData from "./Components/Faculty/StudentListForData";
import Lab from "./Components/Student/Lab";
import TeacherChats from "./Components/Faculty/Chats";
import AssignmentPosted from "./Components/Faculty/AssignmentPosted";

function App() {
    axios.defaults.baseURL = "http://localhost:8080";
    axios.defaults.withCredentials = true;

    const { User } = useCon();

    console.log("App_User", User);
    // console.log(User.user_type);
    return (
        <>
            <Routes>
                {/* Home */}
                <Route exact path="/" element={<Login />} />

                {/* Admin */}
                <Route
                    exact
                    path="/login/adminlogin"
                    element={
                        User && User.user_type == "admin" ? (
                            <Navigate to="/admin/dashboard" />
                        ) : (
                            <AdminLogin />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/dashboard"
                    element={
                        User && User.user_type == "admin" ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/registerfaculty"
                    element={
                        User && User.user_type == "admin" ? (
                            <AddFaculty />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/removefaculty"
                    element={
                        User && User.user_type == "admin" ? (
                            <RemoveFaculty />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                
                <Route
                    exact
                    path="/admin/facultylist"
                    element={
                        User && User.user_type == "admin" ? (
                            <FacultyList />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/studentlist"
                    element={
                        User && User.user_type == "admin" ? (
                            <StudentList />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/adddivision"
                    element={
                        User && User.user_type == "admin" ? (
                            <AddDivision />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/addbatch"
                    element={
                        User && User.user_type == "admin" ? (
                            <AddBatch />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/batchlist"
                    element={
                        User && User.user_type == "admin" ? (
                            <BatchList />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/divisionlist"
                    element={
                        User && User.user_type == "admin" ? (
                            <DivisionList />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/registerstudent"
                    element={
                        User && User.user_type == "admin" ? (
                            <AddStudent />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/removestudent"
                    element={
                        User && User.user_type == "admin" ? (
                            <RemoveStudent />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/subjectorpractical"
                    element={
                        User && User.user_type == "admin" ? (
                            <SubjectOrPractical />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/subjectclassroomteacherassignment"
                    element={
                        User && User.user_type == "admin" ? (
                            <SubjectClassroomTeacherAssignment />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/admin/practicalbatchteacherassignment"
                    element={
                        User && User.user_type == "admin" ? (
                            <PracticalBatchTeacherAssignment />
                        ) : (
                            <Navigate to="/login/adminlogin" />
                        )
                    }
                />

                {/* Faculty */}
                <Route
                    path="/login/facultylogin"
                    element={
                        User && User.user_type == "teacher" ? (
                            <Navigate to="/faculty/dashboard" />
                        ) : (
                            <FacultyLogin />
                        )
                    }
                />
                <Route
                    exact
                    path="/faculty/dashboard"
                    element={
                        User && User.user_type == "teacher" ? (
                            <FacultyDashboard />
                        ) : (
                            <Navigate to="/login/facultylogin" />
                        )
                    }
                />
                <Route
                    path="/login/facultylogin"
                    element={
                        User && User.user_type == "teacher" ? (
                            <Navigate to="/faculty/dashboard" />
                        ) : (
                            <FacultyLogin />
                        )
                    }
                />
                <Route
                    exact
                    path="/faculty/dashboard"
                    element={
                        User && User.user_type == "teacher" ? (
                            <FacultyDashboard />
                        ) : (
                            <Navigate to="/login/facultylogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/faculty/facultyprofile"
                    element={
                        User && User.user_type == "teacher" ? (
                            <FacultyProfile />
                        ) : (
                            <Navigate to="/login/facultylogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/faculty/divisions"
                    element={
                        User && User.user_type == "teacher" ? (
                            <MyDivision />
                        ) : (
                            <Navigate to="/login/facultylogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/faculty/batches"
                    element={
                        User && User.user_type == "teacher" ? (
                            <MyBatches />
                        ) : (
                            <Navigate to="/login/facultylogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/faculty/listofstudents"
                    element={
                        User && User.user_type == "teacher" ? (
                            <StudentListForData />
                        ) : (
                            <Navigate to="/login/facultylogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/faculty/uploadMarksAttendence"
                    element={
                        User && User.user_type == "teacher" ? (
                            <UpdateMarksAttendence />
                        ) : (
                            <Navigate to="/login/facultylogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/faculty/mentorshipgrps"
                    element={
                        User && User.user_type == "teacher" ? (
                            <MentorshipGrps />
                        ) : (
                            <Navigate to="/login/facultylogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/faculty/assignmentsforbatch"
                    element={
                        User && User.user_type == "teacher" ? (
                            <CreateForBatch />
                        ) : (
                            <Navigate to="/login/facultylogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/faculty/assignmentsfordivision"
                    element={
                        User && User.user_type == "teacher" ? (
                            <CreateForDivision />
                        ) : (
                            <Navigate to="/login/facultylogin" />
                        )
                    }
                />
                <Route exact path="/faculty/facultychats" element={ User && User.user_type == "teacher"?(<TeacherChats/> ):(<Navigate to="/login/facultylogin"/>)}/>
          {/* Faculty */}
          <Route
            path="/login/facultylogin"
            element={
              User && User.user_type == "teacher" ? (
                <Navigate to="/faculty/dashboard" />
              ) : (
                <FacultyLogin />
              )
            }
          />
          <Route
            exact
            path="/faculty/dashboard"
            element={
              User && User.user_type == "teacher" ? (
                <FacultyDashboard />
              ) : (
                <Navigate to="/login/facultylogin" />
              )
            }
          />
          <Route
            path="/login/facultylogin"
            element={
              User && User.user_type == "teacher" ? (
                <Navigate to="/faculty/dashboard" />
              ) : (
                <FacultyLogin />
              )
            }
          />
          <Route
            exact
            path="/faculty/dashboard"
            element={
              User && User.user_type == "teacher" ? (
                <FacultyDashboard />
              ) : (
                <Navigate to="/login/facultylogin" />
              )
            }
          />
          <Route
            exact
            path="/faculty/facultyprofile"
            element={
              User && User.user_type == "teacher" ? (
                <FacultyProfile />
              ) : (
                <Navigate to="/login/facultylogin" />
              )
            }
          />
          <Route
            exact
            path="/faculty/divisions"
            element={
              User && User.user_type == "teacher" ? (
                <MyDivision />
              ) : (
                <Navigate to="/login/facultylogin" />
              )
            }
          />
          <Route
            exact
            path="/faculty/batches"
            element={
              User && User.user_type == "teacher" ? (
                <MyBatches />
              ) : (
                <Navigate to="/login/facultylogin" />
              )
            }
          />
          <Route
            exact
            path="/faculty/listofstudents"
            element={
              User && User.user_type == "teacher" ? (
                <StudentListForData />
              ) : (
                <Navigate to="/login/facultylogin" />
              )
            }
          />
          <Route
            exact
            path="/faculty/uploadMarksAttendence"
            element={
              User && User.user_type == "teacher" ? (
                <UpdateMarksAttendence />
              ) : (
                <Navigate to="/login/facultylogin" />
              )
            }
          />
          <Route
            exact
            path="/faculty/mentorshipgrps"
            element={
              User && User.user_type == "teacher" ? (
                <MentorshipGrps />
              ) : (
                <Navigate to="/login/facultylogin" />
              )
            }
          />
          <Route
            exact
            path="/faculty/assignmentsforbatch"
            element={
              User && User.user_type == "teacher" ? (
                <CreateForBatch />
              ) : (
                <Navigate to="/login/facultylogin" />
              )
            }
          />
          <Route
            exact
            path="/faculty/assignmentsfordivision"
            element={
              User && User.user_type == "teacher" ? (
                <CreateForDivision />
              ) : (
                <Navigate to="/login/facultylogin" />
              )
            }
          />
          <Route exact path="/faculty/facultychats" element={ User && User.user_type == "teacher"?(<TeacherChats/> ):(<Navigate to="/login/facultylogin"/>)}/>
          <Route exact path="/faculty/facultyassignments" element={ User && User.user_type == "teacher"?(<AssignmentPosted/> ):(<Navigate to="/login/facultylogin"/>)}/>

                {/* Student */}
                <Route
                    path="/login/studentlogin"
                    element={
                        User && User.user_type == "student" ? (
                            <Navigate to="/student/dashboard" />
                        ) : (
                            <StudentLogin />
                        )
                    }
                />
                <Route
                    exact
                    path="/student/dashboard"
                    element={
                        User && User.user_type == "student" ? (
                            <StudentDashboard />
                        ) : (
                            <Navigate to="/login/studentlogin" />
                        )
                    }
                />
                <Route
                    exact
                    path="/student/studentprofile"
                    element={
                        User && User.user_type == "student" ? (
                            <StudentProfile />
                        ) : (
                            <Navigate to="/login/studentlogin" />
                        )
                    }
                />
                <Route
                    path="/student/studentchats"
                    element={
                        User && User.user_type == "student" ? <Chats /> : <StudentLogin />
                    }
                />
                <Route
                    path="/student/subjects"
                    element={
                        User && User.user_type == "student" ? (
                            <Subject />
                        ) : (
                            <StudentLogin />
                        )
                    }
                />
                <Route
                    path="/student/labs"
                    element={
                        User && User.user_type == "student" ? (
                            < Lab />
                        ) : (
                            <StudentLogin />
                        )
                    }
                />
                <Route
                    path="/student/assignments"
                    element={
                        User && User.user_type == "student" ? (
                            <Assignments />
                        ) : (
                            <StudentLogin />
                        )
                    }
                />
            </Routes>
        </>
    );
}

export default App;
