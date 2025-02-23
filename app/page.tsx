'use client';
import FileShare from "@/components/FileShare";
import Footer from "@/components/Footer";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";

export default function YourComponent() {
  const [publicUrl, setPublicUrl] = useState("");

  return (
    <div className="h-[100vh] w-full bg-neutral-900 flex flex-col justify-center items-center">
      <div className="border border-neutral-800 absolute top-0 left-0 w-full h-fit flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">shareZ</h1>
        <a className="px-5 py-1 rounded-lg border border-neutral-700 transition-all duration-500 ease-out font-mono font-light text-sm hover:border-white bg-neutral-700 text-neutral-50" href="https://github.com/lakshaydewan/shareZ" target="_blank" rel="noopener noreferrer">
          Github
        </a>
      </div>
      <div className="flex md:flex-row flex-col justify-center items-center rounded-2xl border border-neutral-600 lg:w-[60vw] md:w-[75vw] w-[95vw] md:mt-0 mt-5 h-[70vh] md:h-[50vh]">
        <div className="md:w-full w-[90%] h-[90%] rounded-lg m-8 border border-neutral-600 border-dashed flex justify-center items-center">
          <UploadButton
            className="ut-button:bg-gradient-to-r ut-button:w-full ut-button:h-full ut-button:focus-within::outline-none ut-button:focus:ring-0 ut-button:shadow-lg transition-colors duration-500 ease-out ut-button:from-gradientStart ut-button:to-gradientEnd ut-button:text-white ut-button:font-extrabold ut-button:font-sans ut-button:tracking-wider ut-button:py-2 ut-button:px-4 ut-button:rounded-lg"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files:", res[0].ufsUrl);
              setPublicUrl(res[0].ufsUrl);
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
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
        <FileShare publicUrl={publicUrl} handleClose={()=> setPublicUrl("")} />
      )}
       <Footer />
    </div>
  );
}
