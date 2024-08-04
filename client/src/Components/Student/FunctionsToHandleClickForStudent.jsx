const handleStudentClick = ({ Menu, navigate }) => {
  // console.log(Menu);
  if (!Menu.readOnly) {
    if (Menu.title === "Profile") {
      navigate("/student/studentprofile");
    } else if (Menu.title === "Dashboard") {
      navigate("/student/dashboard");
    } else if (Menu.title === "Subject List") {
      navigate("/student/subjects");
    } else if (Menu.title === "Lab List") {
      navigate("/student/labs");
    } else if (Menu.title === "Assignment List") {
      navigate("/student/assignments");
    } else if (Menu.title === "Chats") {
      navigate("/student/studentchats");
    }
  }
};

export default handleStudentClick;
