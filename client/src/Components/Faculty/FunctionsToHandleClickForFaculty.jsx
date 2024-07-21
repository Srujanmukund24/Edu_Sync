const handlefacultyClick = ({ Menu, navigate }) => {
  // console.log(Menu);
  if (!Menu.readOnly) {
    if (Menu.title === "Profile") {
      navigate("/faculty/facultyprofile");
    } else if (Menu.title === "Dashboard") {
      navigate("/faculty/dashboard");
    } else if (Menu.title === "My Divisons") {
      navigate("/faculty/divisions");
    } else if (Menu.title === "My Batches") {
      navigate("/faculty/batches");
    }
    else if (Menu.title === "Upload Marks and Attendence") {
      navigate("/faculty/uploadMarksAttendence");
    } else if (Menu.title === "Create for Division") {
      navigate("/faculty/assignmentsfordivision");
    }
    else if (Menu.title === "Create for Batch") {
      navigate("/faculty/assignmentsforbatch");
    } else if (Menu.title === "Mentorship Groups") {
      navigate("/faculty/mentorshipgrps");
    } else if (Menu.title === "TeacherChats") {
      navigate("/faculty/facultychats");
    } else if (Menu.title === "Assignment List") {
      navigate("/faculty/facultyassignments");
    }
  }
};

export default handlefacultyClick;