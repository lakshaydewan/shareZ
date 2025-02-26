'use client';
import FileShare from "@/components/FileShare";
import Footer from "@/components/Footer";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import axios from "axios";

export default function YourComponent() {
  const [publicUrl, setPublicUrl] = useState("");
  const deleteTimeObj = {
    min: {
      value: 60000,
      label: "1 min"
    },
    hour: {
      value: 3600000,
      label: "1 Hour"
    },
    fourHours: {
      value: 14400000,
      label: "4 Hours"
    },
    twelveHours: {
      value: 43200000,
      label: "12 Hours"
    },
    day: {
      value: 86400000,
      label: "1 Day"
    }
  }
  const [deleteTimeLabel, setDeleteTimeLabel] = useState(deleteTimeObj.min.label);
  const [deleteTime, setDeleteTime] = useState(deleteTimeObj.min.value);

  return (
    <div className="h-[100vh] w-full bg-neutral-900 flex flex-col justify-center items-center">
      <div className="border border-neutral-800 absolute top-0 left-0 w-full h-fit flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">shareZ</h1>
        <a className="px-5 py-1 rounded-lg border border-neutral-700 transition-all duration-500 ease-out font-mono font-light text-sm hover:border-white bg-neutral-700 text-neutral-50" href="https://github.com/lakshaydewan/shareZ" target="_blank" rel="noopener noreferrer">
          Github
        </a>
      </div>
      <div className="flex md:flex-row flex-col justify-center items-center rounded-2xl border border-neutral-600 lg:w-[60vw] md:w-[75vw] w-[95vw] md:mt-0 mt-5 h-[70vh] md:h-[50vh]">
        <div className="md:w-full flex-col w-[90%] h-[90%] rounded-lg m-8 border border-neutral-600 border-dashed flex justify-center items-center">
          <UploadButton
            className="ut-button:bg-gradient-to-r ut-button:w-full ut-button:h-full ut-button:focus-within::outline-none ut-button:focus:ring-0 ut-button:shadow-lg transition-colors duration-500 ease-out ut-button:from-gradientStart ut-button:to-gradientEnd ut-button:text-white ut-button:font-extrabold ut-button:font-sans ut-button:tracking-wider ut-button:py-2 ut-button:px-4 ut-button:rounded-lg"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res) {
                console.log("Upload complete:", res);
                setPublicUrl(res[0].ufsUrl);
                res.forEach(async (file) => {
                    try {
                      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/file-delete`, {
                        fileKey: file.key,
                        deletionTime: deleteTime
                      })
                      console.log("File deletion response:", res);
                      if (res.status === 200) {
                        console.log(`File ${file.key} deleted successfully.`);
                      }
                      console.log(`File ${file.key} deletion request sent.`);
                    } catch (error) {
                      console.error(`Error requesting deletion for ${file.key}:`, error);
                    }
                });
              }
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          <select className="text-neutral-100 cursor-pointer py-3 px-1 rounded-md bg-neutral-900 focus:outline-none focus:ring-0" onChange={(e) => setDeleteTime(Number(e.target.value))}>
            <option onClick={() => setDeleteTimeLabel(deleteTimeObj.min.label)} value={deleteTimeObj.min.value}>{deleteTimeObj.min.label}</option>
            <option onClick={() => setDeleteTimeLabel(deleteTimeObj.hour.label)} value={deleteTimeObj.hour.value}>{deleteTimeObj.hour.label}</option>
            <option onClick={() => setDeleteTimeLabel(deleteTimeObj.fourHours.label)} value={deleteTimeObj.fourHours.value}>{deleteTimeObj.fourHours.label}</option>
            <option onClick={() => setDeleteTimeLabel(deleteTimeObj.twelveHours.label)} value={deleteTimeObj.twelveHours.value}>{deleteTimeObj.twelveHours.label}</option>
            <option onClick={() => setDeleteTimeLabel(deleteTimeObj.day.label)} value={deleteTimeObj.day.value}>{deleteTimeObj.day.label}</option>
          </select>
        </div>
        <div className="w-full flex flex-col justify-between md:items-start items-center h-full p-3 lg:p-8">
          <div className="md:text-start text-center">
            <h1 className="font-mono font-semibold text-3xl">FAST, PRIVATE FILE SHARING</h1>
            <p className="font-mono text-sm mt-3">shareZ lets you share files with end-to-end encryption and a link that automatically expires. So you can keep what you share private and make sure your stuff doesn&apos;t stay online forever.</p>
          </div>
          <div>
            <h1 className="font-mono font-extrabold">Powered by Upload<span className="text-[#ff7e5f]">thing</span></h1>
          </div>
        </div>
      </div>
      {publicUrl && (
        <FileShare deleteTime={deleteTimeLabel} publicUrl={publicUrl} handleClose={() => setPublicUrl("")} />
      )}
      <Footer />
    </div>
  );
}
