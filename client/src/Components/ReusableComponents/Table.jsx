// TanStack Table
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
// import { USERS } from "../data";
import React, { useEffect, useState } from "react";
import DownloadTableDataInExel from "./DownloadTableDataInExel";
import DebouncedInput from "./DebounceInput";
import Search from "../../assets/Search.png";
import { useNavigate } from "react-router";
import { Approve, FetchStudentDataByBatch, FetchStudentDataByDivision, FetchStudentDataById } from "../ReusableComponents/Data"




const TanStackTable = ({ USERS, type }) => {

    const columnHelper = createColumnHelper();
    // console.log("type : ", USERS)
    const [data, setData] = useState([]);
    const [typefor, setTypefor] = useState(type);

    const redirectToLink = (link) => {
        window.open(link, "_blank");
    };

    const handleDivisionList = async (divID) => {
        const data = await FetchStudentDataByDivision(divID);

        setData(data);
        setTypefor("studentinfacultydiv");
    }
    const handleBatchList = async (batchID) => {
        const data = await FetchStudentDataByBatch(batchID);
        setData(data);
        setTypefor("studentinfacultylab");
    }
    const handleStudentInfolistSubject = async (studId) => {
        const data = await FetchStudentDataById(studId);
        console.log("LIst" + data);
        setData(data.subjects);
        setTypefor("studentTotalInfoSub");
    }
    const handleStudentInfolistPractical = async (studId) => {
        const data = await FetchStudentDataById(studId);
        console.log("LIst" + data)
        setData(data.practicals);
        setTypefor("studentTotalInfoPrac");
    }
    const handleApprove = async (studentId,forLab,newst) => {
        console.log("HIIIIi")
        if(newst==false){
            return;
        }
        const data = await Approve(studentId,forLab,newst);
        // window.location.reload();
        console.log("resp" + data)
    }

    const columns = [
        // division
        ...(typefor === "division"
            ? [
                columnHelper.accessor("division", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Division",
                }),
                columnHelper.accessor("year", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Year",
                }),
                columnHelper.accessor("CCID", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Name Of CC",
                }),
                // Add a column for displaying batches
                columnHelper.accessor("batches", {
                    cell: (info) => (
                        <span className="flex gap-2">
                            {info.row.original.batches.map((batch) => (
                                <div key={batch}>{batch}</div>
                            ))}
                        </span>
                    ),
                    header: "Name of Batches",
                }),
            ]
            : []),

        ...(type === "MySubjects"
            ? [
                columnHelper.accessor("subname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Subject",
                }),
                columnHelper.accessor("teacher_id.fname", {
                    cell: (info) => <span>{info.row.original.teacher_id.fname} {info.row.original.teacher_id.lname}</span>,
                    header: "Teacher Name",
                }),
                columnHelper.accessor("marks", {
                    cell: (info) => (
                        <span className="flex gap-2">
                            {info.row.original.marks.map((value, index) => (
                                <React.Fragment key={index}>
                                    <div>{value.test_type}</div>
                                    <p>:</p>
                                    <div>{value.marks}</div>
                                </React.Fragment>
                            ))}
                        </span>
                    ),
                    header: "Marks",
                }),
                columnHelper.accessor("attendance", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Attendance",
                }),
                columnHelper.accessor("sub_ticket_approval", {
                    cell: (info) => (
                        <span
                            className={`inline-block rounded-full px-1 py-0.5 text-xs ${info.getValue()
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                                }`}
                        >
                            {info.getValue() ? "Approved" : "Not Approved"}
                        </span>
                    ),
                    header: "Ticket Approval",
                }),
            ]
            : []),

        ...(type === "MyLabs"
            ? [
                columnHelper.accessor("pracsubname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Lab",
                }),
                columnHelper.accessor("teacher_id", {
                    cell: (info) => <span>{info.row.original.teacher_id.fname} {info.row.original.teacher_id.lname}</span>,
                    header: "Teacher Name",
                }),
                columnHelper.accessor("marks", {
                    cell: (info) => (
                        <span className="flex gap-2">
                            {info.row.original.marks.map((value, index) => (
                                <React.Fragment key={index}>
                                    <div>{value.test_type}</div>
                                    <p>:</p>
                                    <div>{value.marks}</div>
                                </React.Fragment>
                            ))}
                        </span>
                    ),
                    header: "Marks",
                }),
                columnHelper.accessor("attendance", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Attendance",
                }),
                columnHelper.accessor("sub_ticket_approval", {
                    cell: (info) => (
                        <span
                            className={`inline-block rounded-full px-1 py-0.5 text-xs ${info.getValue()
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                                }`}
                        >
                            {info.getValue() ? "Approved" : "Not Approved"}
                        </span>
                    ),
                    header: "Ticket Approval",
                }),
            ]
            : []),

        ...(type === "CompletedAssignments"
            ? [
                columnHelper.accessor("subject", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Subject",
                }),
                columnHelper.accessor("problemstatement", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "problemstatement",
                }),
                columnHelper.accessor("uploaded_doc_link", {
                    cell: (info) =>
                        info.row.original.uploaded_doc_link.length > 0 ? (
                            <button
                                className="text-blue-500 underline"
                                onClick={() => redirectToLink(info.getValue())}
                            >
                                View Document
                            </button>
                        ) : (
                            <span>No Link</span>
                        ),
                    header: "Links",
                }),
            ]
            : []),

        ...(type === "IncompletedAssignments"
            ? [
                columnHelper.accessor("subject", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Subject",
                }),
                columnHelper.accessor("problemstatement", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "problemstatement",
                }),
                columnHelper.accessor("uploaded_doc_link", {
                    cell: (info) => (
                        <>
                            {info.row.original.uploaded_doc_link.length > 0 ? (
                                <button
                                    className="text-blue-500 underline"
                                    onClick={() => redirectToLink(info.getValue())}
                                >
                                    View Document
                                </button>
                            ) : (
                                <form className="form">
                                    <input type="file" />
                                    <button type="submit">Upload</button>
                                </form>
                            )}
                        </>
                    ),
                    header: "Upload",
                }),
            ]
            : []),
        ...(type === "FacultyAssignments"
            ? [
                columnHelper.accessor("student_id", {
                    cell: (info) => <span>{info.getValue().fname}</span>,
                    header: "Student Name",
                }),
                columnHelper.accessor("problemstatement", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "problemstatement",
                }),
                columnHelper.accessor("uploaded_doc_link", {
                    cell: (info) => (
                        <>
                            {info.row.original.uploaded_doc_link.length > 0 ? (
                                <button
                                    className="text-blue-500 underline"
                                    onClick={() => redirectToLink(info.getValue())}
                                >
                                    View Document
                                </button>
                            ) : (
                                <span>
                                    Incomplete
                                </span>
                            )}
                        </>
                    ),
                    header: "Review",
                }),
            ]
            : []),





        // batches
        ...(typefor === "batch"
            ? [
                columnHelper.accessor("name", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "name Of Batch",
                }),
                columnHelper.accessor("tgname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Name of Teacher Gaurdian",
                }),
            ]
            : []),

        ...(typefor === "student"
            ? [
                columnHelper.accessor("regid", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "regId",
                }),
                columnHelper.accessor("fname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "First Name",
                }),
                columnHelper.accessor("lname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Last Name",
                }),
                columnHelper.accessor("email", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "email",
                }),
                columnHelper.accessor("mobile", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Mobile",
                }),
                columnHelper.accessor("division", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Division",
                }),
                columnHelper.accessor("batch", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Batch",
                }),
            ]
            : []),

        // facultyOrStudent
        ...(typefor === "faculty"
            ? [
                columnHelper.accessor("regid", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "regId",
                }),
                columnHelper.accessor("fname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "First Name",
                }),
                columnHelper.accessor("lname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Last Name",
                }),
                columnHelper.accessor("email", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "email",
                }),
                columnHelper.accessor("mobile", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Mobile",
                }),
            ]
            : []),

        // mentorshipgrps for falcuty
        ...(typefor === "mymentorshipgrps"
            ? [
                columnHelper.accessor("group_id", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Group ID NO.",
                }),
                columnHelper.accessor("type", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Course Type",
                }),
                // Add a column for displaying batches
                columnHelper.accessor("student_names", {
                    cell: (info) => (
                        <span className="flex flex-col gap-2">
                            {info.row.original.student_names.map((student_name) => (
                                <div key={student_name}>{student_name}</div>
                            ))}
                        </span>
                    ),
                    header: "Name of Students",
                }),
                columnHelper.accessor("teacher_id", {
                    cell: (info) => (
                        <button
                            className=" bg-indigo-100 text-black rounded pl-2 pr-2 justify-center items-center"
                            onClick={() => {
                                handleChatClick(info.getValue());
                            }}
                        >
                            Click to Chat
                        </button>
                    ),
                    header: "Chat",
                }),
            ]
            : []),

        // mydivision for faculty
        ...(typefor === "mydivisions"
            ? [
                columnHelper.accessor("divisionName", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Divison Name",
                }),
                columnHelper.accessor("subject", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Subject",
                }),
                columnHelper.accessor("divID", {
                    cell: (info) => {
                        return (
                            <button
                                className="bg-indigo-100 text-black rounded pl-2 pr-2 justify-center items-center"
                                onClick={() => {
                                    handleDivisionList(info.getValue());
                                }}
                            >
                                Show Students
                            </button>
                        );
                    },
                    header: "Student List",
                }),
            ]
            : []),

        // mybatches for faculty
        ...(typefor === "mybatches"
            ? [
                columnHelper.accessor("batchName", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Batch Name",
                }),
                columnHelper.accessor("subject", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Subject",
                }),
                columnHelper.accessor("batchID", {
                    cell: (info) => {
                        const navigate = useNavigate(); // Initialize navigate function using useNavigate hook
                        return (
                            <button
                                className="bg-indigo-100 text-black rounded pl-2 pr-2 justify-center items-center"
                                onClick={() => {
                                    handleBatchList(info.getValue());
                                }}
                            >
                                Show Students
                            </button>
                        );
                    },
                    header: "Student List",
                }),
            ]
            : []),

        ...(typefor === "studentinfacultydiv"
            ? [
                columnHelper.accessor("rollno", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "RollNo",
                }),
                columnHelper.accessor("fname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "First Name",
                }),
                columnHelper.accessor("lname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Last Name",
                }),
                columnHelper.accessor("_id", {
                    cell: (info) => {
                        const navigate = useNavigate(); // Initialize navigate function using useNavigate hook
                        return (
                            <button
                                className="bg-indigo-100 text-black rounded pl-2 pr-2 justify-center items-center"
                                onClick={() => {
                                    handleStudentInfolistSubject(info.getValue());
                                }}
                            >
                                Show Data
                            </button>
                        );
                    },
                    header: "Student List",
                }),
            ]
            : []),
        ...(typefor === "studentinfacultylab"
            ? [
                columnHelper.accessor("rollno", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "RollNo",
                }),
                columnHelper.accessor("fname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "First Name",
                }),
                columnHelper.accessor("lname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Last Name",
                }),
                columnHelper.accessor("_id", {
                    cell: (info) => {
                        const navigate = useNavigate(); // Initialize navigate function using useNavigate hook
                        return (
                            <button
                                className="bg-indigo-100 text-black rounded pl-2 pr-2 justify-center items-center"
                                onClick={() => {
                                    handleStudentInfolistPractical(info.getValue());
                                }}
                            >
                                Show Data
                            </button>
                        );
                    },
                    header: "Student List",
                }),
            ]
            : []),

        ...(typefor === "studentTotalInfoSub"
            ? [
                columnHelper.accessor("subname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Subject",
                }),
                columnHelper.accessor("marks", {
                    cell: (info) => (
                        <span className="flex gap-2">
                            {info.row.original.marks.map((value, index) => (
                                <React.Fragment key={index}>
                                    <div>{value.test_type}</div>
                                    <p>:</p>
                                    <div>{value.marks}</div>
                                </React.Fragment>
                            ))}
                        </span>
                    ),
                    header: "Marks",
                }),
                columnHelper.accessor("attendance", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Attendance",
                }),
                columnHelper.accessor("sub_ticket_approval", {
                    cell: (info) => (
                        <button
                            className={`inline-block rounded-full px-1 py-0.5 text-xs ${info.getValue()
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                                }`}
                                onClick={() => {
                                    console.log("skghkrhglj"+!info.getValue());
                                    handleApprove(info.row.original.std_id,true,!info.getValue());
                                }}
                        >     
                            {info.getValue() ? "Approved" : "Not Approved"}
                           
                        </button>
                    ),
                    header: "Ticket Approval",
                }),
            ]
            : []),
        ...(typefor === "studentTotalInfoPrac"
            ? [
                columnHelper.accessor("pracsubname", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Practical",
                }),
                columnHelper.accessor("marks", {
                    cell: (info) => (
                        <span className="flex gap-2">
                            {info.row.original.marks.map((value, index) => (
                                <React.Fragment key={index}>
                                    <div>{value.test_type}</div>
                                    <p>:</p>
                                    <div>{value.marks}</div>
                                </React.Fragment>
                            ))}
                        </span>
                    ),
                    header: "Marks",
                }),
                columnHelper.accessor("attendance", {
                    cell: (info) => <span>{info.getValue()}</span>,
                    header: "Attendance",
                }),
                columnHelper.accessor("sub_ticket_approval", {
                    cell: (info) => (
                        <button
                            className={`inline-block rounded-full px-1 py-0.5 text-xs ${info.getValue()
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                                }`
                            }
                            onClick={() => {
                                console.log("skghkrhglj"+!info.getValue())
                                handleApprove(info.row.original.std_id,true,!info.getValue());
                            }}
                        >
                            {info.getValue() ? "Approved" : "Not Approved"} 

                        </button>
                    ),
                    header: "Ticket Approval",
                }),

            ]
            : []),
    ];




    useEffect(() => {
        setData([...USERS]); // Update data whenever USERS changes
    }, [USERS]);

    // console.log("Data : ", data , USERS);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    const navigate = useNavigate();
    const data1 = { name: "John", age: 30 };
    function navigateToList(e) {
        console.log("infunction", e);
        navigate("/faculty/listofstudents", { state: e });
    }

    function handleChatClick(data) {
        console.log("in chat click");
        navigate("/faculty/facultychats", { state: data });
    }


    return (
        <div className="p-2 max-w-5xl mx-auto  fill-gray-100">
            <div className="flex justify-between mb-2">
                <div className="w-full flex items-center gap-1">
                    <img src={Search} alt="Search" />
                    <DebouncedInput
                        value={globalFilter ?? ""}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
                        placeholder="Search all columns..."
                    />
                </div>
                <DownloadTableDataInExel data={data} fileName={"peoples"} />
            </div>

            <table className="border shadow-sm border-gray-100 w-full text-left">
                <thead className="text-white bg-indigo-600">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="capitalize p-3">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row, i) => (
                            <tr
                                key={row.id}
                                className={` ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                                    } text-white`}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-3.5 py-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr className="text-center text-black h-32">
                            <td colSpan={12}>No Recoard Found!</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* pagination */}
            <div className="flex items-center justify-end mt-2 gap-3">
                <button
                    onClick={() => {
                        table.previousPage();
                    }}
                    disabled={!table.getCanPreviousPage()}
                    className={`${table.getCanPreviousPage() && "hover:bg-indigo-500 "
                        } p-1 border rounded-sm h-10 w-12 flex justify-center items-center text-xl text-white bg-indigo-400 border-gray-400 px-2 disabled:opacity-30 `}
                >
                    {"<"}
                </button>

                <button
                    onClick={() => {
                        table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                    className={`${table.getCanNextPage() && "hover:bg-indigo-500 "
                        } p-1 border rounded-sm h-10 w-12 flex justify-center items-center text-xl text-white bg-indigo-400 border-gray-400 px-2 disabled:opacity-30 `}
                >
                    {">"}
                </button>

                <span className="flex items-center gap-1 text-lg text-gray-500">
                    <div>Page</div>
                    <div>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                </span>

                <span className="flex items-center text-lg gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        className="border h-10 border-gray-400 p-1 rounded w-16 bg-transparent"
                    />
                </span>

                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className="p-1 h-10 rounded-sm font-medium text-white bg-indigo-400 px-2 hover:bg-indigo-500"
                >
                    {[5, 10, 20, 30, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TanStackTable;
