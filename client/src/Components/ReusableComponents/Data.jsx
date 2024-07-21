import axios from "axios"
import { toast } from "react-toastify";


async function FetchSubjectData() {
    const url = "/getSubjects";
    try {
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}

async function FetchPracticalData() {
    const url = "/getPracticals";
    try {
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}


async function FetchTeacherData() {
    const url = "/getteachers";
    try {
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}

async function FetchStudentData() {
    const url = "/getstudents";
    try {
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}

async function FetchDivisionData() {
    const url = "/getdivision";
    try {
        const { data } = await axios.get(url);
        // console.log("division :" , data);
        return data
    } catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}

async function FetchBatchData() {
    const url = "/getbatches";
    try {
        const { data } = await axios.get(url);
        return data
    } catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}

async function FetchMySubjects() {
  const url = "/getStudentSubjectInfo";
  try {
    const  {data}  = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Not getting data", error);
    toast.error("Not getting data");
  }
}

async function FetchMyLabs() {
  const url = "/getStudentPracticalInfo";
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Not getting data", error);
    toast.error("Not getting data");
  }
}

async function FetchCompletedAssignments() {
    const url = "/getCompleted";
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error("Not getting data", error);
        toast.error("Not getting data");
    }
}
async function FetchIncompletedAssignments() {
    const url = "/getIncomplete";
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error("Not getting data", error);
        toast.error("Not getting data");
    }
}

async function FetchCurrentAdmin() {
    //yecha route aahe ka nhi mahit nahi backend la 
    const url = "/getcurentstudent";
    try {
        const { data } = await axios.get(url);
        return data
    }
    catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}
async function FetchCurrentStudent() {
    //yecha route aahe ka nhi mahit nahi backend la 
    const url = "/getcurrentstudent";
    try {
        const { data } = await axios.get(url);
        return data
    }
    catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}



async function FetchMyDivisions() {
    //yecha route aahe ka nhi mahit nahi backend la 
    const url = "/myDivisions";
    try {
        const  {data}  = await axios.get(url);
        // console.log(data);
        return data
    }
    catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}

async function FetchMyBatches() {
  //yecha route aahe ka nhi mahit nahi backend la
  const url = "/myBatches";
  try {
    const { data } = await axios.get(url);
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Not getting data", error);
    toast.error("Not getting data");
  }
}
async function FetchCurrentTeacher() {
    //yecha route aahe ka nhi mahit nahi backend la 
    const url = "/getcurrentteacher";
    try {
        const { data } = await axios.get(url);
        return data
    }
    catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}
async function FetchStudentDataByDivision(divID) {
    //yecha route aahe ka nhi mahit nahi backend la 
    const url = `/students/division/${divID}`;
    console.log(divID,url)
    try {
        const { data } = await axios.get(url);
        console.log(data);
        return data

    }
    catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}
async function FetchStudentDataByBatch(batchID) {
    //yecha route aahe ka nhi mahit nahi backend la 
    const url = `/students/batch/${batchID}`;
    console.log(batchID,url)
    try {
        const { data } = await axios.get(url);
        console.log(data);
        return data

    }
    catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}
async function FetchStudentDataById(studentID) {
    //yecha route aahe ka nhi mahit nahi backend la 
    const url = `/getCompleteStudentDetails/${studentID}`;
    console.log(studentID,url)
    try {
        const { data } = await axios.get(url);
        console.log(data);
        return data

    }
    catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}
async function FetchMentorGroupByTeacher() {
    //yecha route aahe ka nhi mahit nahi backend la 
    const url = `/getgrpbyteacher`;
    // console.log(batchID,url)
    try {
        const { data } = await axios.get(url);
        console.log(data);
        return data

    }
    catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}
async function FetchAssignmentsByTeacher() {
    //yecha route aahe ka nhi mahit nahi backend la 
    const url = `/getAssignmentsforteacher`;
    // console.log(batchID,url)
    try {
        const { data } = await axios.get(url);
        console.log(data);
        return data

    }
    catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}
async function Approve(studentId,forLab,newStatus){
    const url = `/updateTicketStatus`;
    // console.log(batchID,url)
    try {
        const { data } = await axios.post(url,{studentId,forLab,newStatus});
        if(data){
            toast.success("Aproved Successfull");
        }else{
            toast.error("Approved Failed")
        }
        console.log(data);
        return data

    }
    catch (error) {
        console.error('Not getting data', error);
        toast.error("Not getting data");
    }
}


export {
  FetchPracticalData,
  FetchSubjectData,
  FetchTeacherData,
  FetchStudentData,
  FetchBatchData,
  FetchDivisionData,
  FetchCompletedAssignments,
  FetchIncompletedAssignments,
  FetchCurrentAdmin,
  FetchCurrentStudent,
  FetchCurrentTeacher,
  FetchStudentDataByDivision,
  FetchStudentDataByBatch,
  FetchMyLabs,
  FetchMySubjects,
  FetchMentorGroupByTeacher,
  FetchMyDivisions,
  FetchMyBatches,
  FetchAssignmentsByTeacher,
  FetchStudentDataById,
  Approve
};

