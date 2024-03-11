"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCloudUpload } from "react-icons/bs";
import useNameData from "../hook";

type Inputs = {
  description: string;
  chamberName: string;
  logoImage: File;
};
export default function Step() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Inputs>();
  const logoImage = watch("logoImage");
  const router = useRouter();
  const { setData } = useNameData();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setData(data);
    router.push("/section/step2");
  };
  console.log(useNameData());
  //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.files) {
  //       setValue("logoImage", event.target.files);
  //     }
  //   };
  //   console.log(watch("description")); // watch input value by passing the name of it
  return (
    <div className='flex w-full justify-center items-center flex-col'>
      <input
        {...register("description")}
        className='border-2 focus:outline-none rounded-lg border-emerald-500 mt-2 '
        type='text'
      />
      <input
        className='border-2 focus:outline-none rounded-lg border-emerald-500  mt-2'
        type='text'
        {...register("chamberName", {
          required: { value: true, message: "the field is requiered" },
        })}
      />
      {errors.chamberName && <span>{errors.chamberName.message}</span>}
      <div className='flex'>
        <input
          className='hidden'
          type='file'
          accept='image/*'
          id='logoImage'
          {...register("logoImage", {
            required: { value: true, message: "The field is required" },
          })}
        />
        <label
          htmlFor='logoImage'
          className='cursor-pointer bg-blue-500 text-white p-2 rounded-md flex items-center justify-center'>
          <BsCloudUpload />
        </label>
        {logoImage && <span className='mt-2'>{"file"}</span>}
      </div>

      {errors.logoImage && <span>{errors.logoImage.message}</span>}
      <button onClick={handleSubmit(onSubmit)}>submit</button>
    </div>
  );
}
