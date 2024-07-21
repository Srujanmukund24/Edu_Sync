import Download from "../../assets/Download.png";
import * as XLSX from "xlsx/xlsx.mjs";

const DownloadBtn = ({ data = [], fileName }) => {
    return (
        <button
            className="download-btn w-40"
            onClick={() => {
                const datas = data?.length ? data : [];
                const worksheet = XLSX.utils.json_to_sheet(datas);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
            }}
        >
            <img className=" h-6" src={Download} />
            Download
        </button>
    );
};

export default DownloadBtn;
