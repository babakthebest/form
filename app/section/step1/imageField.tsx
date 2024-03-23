import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";

type Props = {
  files: FileList | null;
  setFiles: (image: FileList | null) => void;
  register: any;
  required: boolean;
  set: any;

  id: string;
};
interface ExtendedFile extends File {
  preview: string;
}
export default function ImageField({
  files,
  setFiles,
  register,
  id,
  required,
  set,
}: Props) {
  // const onDrop = useCallback((acceptedFiles: FileList) => {
  //     if (acceptedFiles?.length) {
  //         setFiles((previousFiles: FileList | null) => {
  //             const newFiles = Array.from(acceptedFiles).map(file =>
  //                 Object.assign(file, { preview: URL.createObjectURL(file) })
  //             );
  //             return previousFiles ? Array.from(previousFiles).concat(newFiles) : newFiles;
  //         });
  //     }
  // }, [setFiles]);

  const [dropzoneError, setDropzoneError] = useState<string | null>();

  const onDrop = useCallback(
    (acceptedFiles: File[], rejecteds: FileRejection[], __: DropEvent) => {
      if (acceptedFiles?.length) {
        const newFiles: ExtendedFile[] = Array.from(acceptedFiles).map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        const updatedFileList = new DataTransfer();
        newFiles.forEach((file) => {
          updatedFileList.items.add(file);
        });
        console.log("updatedFileList.files", updatedFileList.files);
        setFiles(updatedFileList.files);
      }
      console.log(rejecteds);
      rejecteds.length > 0
        ? setDropzoneError(rejecteds[0].errors[0].message)
        : setDropzoneError(null);
    },

    [setFiles]
  );
  useEffect(() => {
    set(id, files);
  }, [files]);

  const onRemoveFile = (name: string) => {
    if (files) {
      const newFile = Array.from(files).filter((item) => item.name !== name);
      const updatedFileList = new DataTransfer();
      newFile.forEach((file) => {
        updatedFileList.items.add(file);
      });

      setFiles(updatedFileList.files);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onError: () => console.log("error logged"),
    maxSize: 1024 * 1024,
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 1,
  });
  // console.log(getRootProps);
  // console.log("isDragActive",isDragActive);
  // console.log(getInputProps);
  //   console.log("files=>", files);

  return (
    <>
      <div
        {...getRootProps({
          className: ` ${
            isDragActive ? "border-rose-400 " : "border-neutral-400 "
          }  w-full  mob:w-1/2 
        h-40  p-1 flex  items-center justify-center border rounded-md border-dashed animate-border-dance`,
        })}
      >
        <input
          multiple={false}
          {...register(id, { required: required })}
          {...getInputProps()}
        />
        <div className="flex flex-col items-center justify-center gap-4 cursor-pointer">
          <RiUploadCloud2Fill
            className={`h-5 w-5 fill-current text-neutral-400 ${
              isDragActive && "animate-bounce"
            }`}
          />
          {isDragActive ? (
            <p className="text-xs text-neutral-400">
              فایل ها را این جا رها کنید
            </p>
          ) : (
            <p className="text-center text-xs text-neutral-400">
              فایل ها را اینجا کشیده و رها کنید یا برای انتخاب کردن کلیک کنید.
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-2 mt-3">
        {files &&
          Array.from(files).map((file, index) => (
            <div className="relative" key={index}>
              <Image
                alt={file.name}
                className="w-24 h-24 rounded"
                src={URL.createObjectURL(file)}
                width={50}
                height={50}
              />
              {/* <ProgressBar size={file.size} /> */}
              <IoMdTrash
                onClick={(e) => onRemoveFile(file.name)}
                className="cursor-pointer text-rose-700 hover:text-slate-700"
              />
            </div>
          ))}
        {dropzoneError && <p>{dropzoneError}</p>}
      </div>
    </>
  );
}

// {...getInputProps()}
