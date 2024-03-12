"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCloudUpload } from "react-icons/bs";
import useChamberHook from "../hook";

type Inputs = {
  description: string | null;
  chamberName: string | null;
  logoImage: FileList | null;
  deliveryInTown: boolean | null;
  freeDeliveryInTown: boolean | null;
  payAtHomeInTown: boolean | null;
  deliveryInOtherCity: boolean | null;
  freeDeliveryInOtherCity: boolean | null;
  payAtHomeInOtherCity: boolean | null;
  address: string | null;
  cityId: number | null;
};
export default function Step() {
  const { setData, property } = useChamberHook();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Inputs>({
    defaultValues: {
      description: property.description,
      chamberName: property.chamberName,
      logoImage: property.logoImage,
    },
  });
  const logoImage = watch("logoImage");
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("datais in first step=>", data);
    setData({ property: data });

    router.push("/section/step2");
  };
  // console.log(useChamberHook());
  //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.files) {
  //       setValue("logoImage", event.target.files);
  //     }
  //   };
  //   console.log(watch("description")); // watch input value by passing the name of it
  console.log("errors=>", errors?.chamberName?.message);
  console.log("errors2=>", errors.logoImage);

  return (
    <div className='flex w-full justify-center items-center flex-col'>
      <div className='flex'>
        <input
          id='description'
          {...register("description")}
          className='border-2 focus:outline-none rounded-lg border-emerald-500 mt-2 '
          type='text'
        />
        <label htmlFor='description'>description</label>
      </div>
      <div className='flex'>
        <input
          id='chamberName'
          className='border-2 focus:outline-none rounded-lg border-emerald-500  mt-2'
          type='text'
          {...register("chamberName", {
            required: { value: true, message: "the field is requiered 0" },
          })}
        />
        <label htmlFor='chamberName'>chamberName</label>
      </div>
      {errors.chamberName && <span>{errors.chamberName.message}</span>}
      <div className='flex'>
        <input
          id='address'
          className='border-2 focus:outline-none rounded-lg border-emerald-500  mt-2'
          type='text'
          {...register("address", {
            required: { value: true, message: "the field is requiered 0" },
          })}
        />
        <label htmlFor='address'>address</label>
      </div>
      {errors.address && <span>{errors.address.message}</span>}
      <div className='flex'>
        <input
          id='cityId'
          className='border-2 focus:outline-none rounded-lg border-emerald-500  mt-2'
          type='number'
          {...register("cityId", {
            required: { value: true, message: "the field is requiered 0" },
          })}
        />
        <label htmlFor='cityId'>cityId</label>
      </div>
      {errors.cityId && <span>{errors.cityId.message}</span>}
      <div className='flex'>
        <input
          className='hidden'
          type='file'
          accept='image/*'
          id='logoImage'
          {...register("logoImage", {
            required: { value: true, message: "The field is required 1" },
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
