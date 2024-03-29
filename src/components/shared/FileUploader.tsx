// @ts-ignore
import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
  profile: boolean;
};

const FileUploader = ({
  fieldChange,
  mediaUrl,
  profile,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".svg", ".jpg"],
    },
  });

  return (
    <>
      {profile ? (
        <div {...getRootProps()} className="flex  flex-col cursor-pointer ">
          <div
            {...getRootProps()}
            className="flex -flex-center flex-col bg-dark-3 cursor-pointer "
          ></div>
          <input {...getInputProps()} className="cursor-pointer" />
          {fileUrl ? (
            <>
              <div className="flex items-center gap-4 lg:w-3/4">
                <img
                  src={fileUrl}
                  alt="profile picture"
                  width={80}
                  height={80}
                  className="object-cover h-20 w-20 rounded-full"
                />{" "}
                <p className="text-blue-500">Change Profile Photo</p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4 lg:w-1/2">
              <img
                src={mediaUrl || `/assets/icons/profile-placeholder.svg`}
                alt="file upload"
                width={85}
                height={85}
                className="object-cover h-20 w-20 rounded-full"
              />{" "}
              <p className="text-blue-500">Change Profile Photo</p>
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="flex -flex-center flex-col bg-dark-3 cursor-pointer "
        >
          <input {...getInputProps()} className="cursor-pointer" />
          {fileUrl ? (
            <>
              <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                <img
                  src={fileUrl}
                  alt="image"
                  className="file_uploader-img object-contain "
                />
              </div>
              <p className="file_uploader-label">
                Click or Drag photo to replace
              </p>
            </>
          ) : (
            <div className="file_uploader-box">
              <img
                src="/assets/icons/file-upload.svg"
                alt="file upload"
                width={96}
                height={77}
              />{" "}
              <h3 className="base-medium text-light-2 mb-2 mt-6">
                Drag your file here
              </h3>
              <p className="tex-light-4 small-regular mb-6">SVG,PNG,JPG</p>
              <Button className="shad-button_dark_4">
                Select from Computer
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FileUploader;
