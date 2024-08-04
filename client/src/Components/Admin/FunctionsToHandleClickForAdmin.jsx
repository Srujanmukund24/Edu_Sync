

const handleAdminClick = ({Menu, navigate}) => {
    // console.log(Menu);
    if (!Menu.readOnly) {
        if (Menu.title === "Register Faculty") {
            navigate("/admin/registerfaculty");
        }else if(Menu.title === "Remove Faculty"){
            navigate("/admin/removefaculty");
        }else if(Menu.title === "Dashboard"){
            navigate("/admin/dashboard");
        }else if(Menu.title === "Profile"){
            navigate("/admin/adminprofile");
        }else if(Menu.title === "Faculty List"){
            navigate("/admin/facultylist");
        }else if(Menu.title === "Student List"){
            navigate("/admin/studentlist");
        }else if(Menu.title === "Add Division"){
            navigate("/admin/adddivision");
        }else if(Menu.title === "Add Batch"){
            navigate("/admin/addbatch");
        }else if(Menu.title === "Batch List"){
            navigate("/admin/batchlist");
        }else if(Menu.title === "Division List"){
            navigate("/admin/divisionlist");
        }else if(Menu.title === "Register Student"){
            navigate("/admin/registerstudent");
        }else if(Menu.title === "Remove Student"){
            navigate("/admin/removestudent");
        }else if(Menu.title === "Subject Or Practical"){
            navigate("/admin/subjectorpractical");
        }else if(Menu.title === "Subject Classroom Teacher Assignment"){
            navigate("/admin/subjectclassroomteacherassignment");
        }else if(Menu.title === "Subject Classroom Teacher Assignment"){
            navigate("/admin/subjectclassroomteacherassignment");
        }else if(Menu.title === "Practical Batch Teacher Assignment"){
            navigate("/admin/practicalbatchteacherassignment");
        }
    }
};

export default handleAdminClick;
