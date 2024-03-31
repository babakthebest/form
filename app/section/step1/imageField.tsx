import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import Compressor from "compressorjs";

type Props = {
  files: (Blob | File)[] | null;
  setFiles: (image: (Blob | File)[] | null) => void;
  register: UseFormRegister<any>;
  required: boolean;
  set: UseFormSetValue<any>;
  maxFiles: number;
  maxSize: number;
  id: string;
  formError: FieldErrors<any>;
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
  maxFiles,
  maxSize,
  formError,
}: Props) {
  const [dropzoneError, setDropzoneError] = useState<string | null>();
  function bytesToMB(bytes: number) {
    return (bytes / (1024 * 1024)).toFixed(2);
  }

  const compressImage = (file: Blob): Promise<File | Blob> => {
    // const fileName = `compressed_${Date.now()}.jpg`;
    // const file = new File([blob], fileName, {
    //   type: blob.type,
    //   lastModified: Date.now(),
    // });
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        minHeight: 600, // Adjust compression quality as needed
        minWidth: 600,
        maxWidth: 1750,
        maxHeight: 1750,
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  };
  const rejectionError = (rejecteds: FileRejection[]) => {
    if (rejecteds[0].errors.length > 0) {
      if (rejecteds[0].errors[0].code === "too-many-files") {
        setDropzoneError(`تعداد فایل باید کمتر از ${maxFiles} باشد`);
      }
      if (rejecteds[0].errors[0].code === "file-too-large") {
        setDropzoneError(
          `  حجم فایل ارسالی باید کمتر از ${bytesToMB(maxSize)}  مگابایت باشد .`
        );
      }
      if (rejecteds[0].errors[0].code === "file-invalid-type") {
        setDropzoneError("فقط آپلود عکس مجاز است");
      }
    }
  };
  const onDrop = useCallback(
    async (
      acceptedFiles: File[],
      rejecteds: FileRejection[],
      __: DropEvent
    ) => {
      if (acceptedFiles?.length) {
        // const newFiles: ExtendedFile[] = Array.from(acceptedFiles).map((file) =>
        //   Object.assign(file, { preview: URL.createObjectURL(file) })
        // );
        const compressedFiles = await Promise.all(
          acceptedFiles.map((i) => compressImage(i))
        );
        console.log("compressedFiles=>", compressedFiles);
        // const updatedFileList = new DataTransfer();
        // compressedFiles.forEach((file) => {
        //   updatedFileList.items.add(file);
        // });
        // console.log("updatedFileList.files", updatedFileList.files);
        setFiles(compressedFiles);
      }
      console.log("rejecteds", rejecteds);
      rejecteds.length > 0 ? rejectionError(rejecteds) : setDropzoneError(null);
    },
    [setFiles]
  );
  useEffect(() => {
    set(id, files);
  }, [files]);
  useEffect(() => {}, [dropzoneError]);
  const onRemoveFile = (indexToRemove: number) => {
    if (files) {
      const newFile = Array.from(files).filter(
        (_, index) => index !== indexToRemove
      );
      // const updatedFileList = new DataTransfer();
      // newFile.forEach((file) => {
      //   updatedFileList.items.add(file);
      // });

      setFiles(newFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // onError: () => console.log("error logged"),
    maxSize: maxSize,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: maxFiles,
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
        h-20  p-1 flex  items-center justify-center border rounded-md border-dashed animate-border-dance`,
        })}
      >
        <input
          // multiple={false}
          {...register(id, {
            required: { value: required, message: "انتخاب عکس الزامی است" },
          })}
          {...getInputProps()}
        />
        <div className="flex flex-col items-center justify-center gap-4 cursor-pointer ">
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
                alt={"importted files"}
                className="w-24 h-24 rounded"
                src={URL.createObjectURL(file)}
                width={50}
                height={50}
              />
              {/* <ProgressBar size={file.size} /> */}
              <IoMdTrash
                onClick={(e) => onRemoveFile(index)}
                className="cursor-pointer text-rose-700 hover:text-slate-700"
              />
            </div>
          ))}
        {dropzoneError && (
          <p className="text-rose-500 text-xs mt-2 pr-2">{dropzoneError}</p>
        )}
        {formError[id] && (
          <p className="text-rose-500 text-xs mt-2 pr-2">
            {formError[id].message as string}
          </p>
        )}
      </div>
    </>
  );
}

// {...getInputProps()}
