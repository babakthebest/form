"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useChamberHook from "../hook";
import axios from "axios";

type Inputs = {
  description: string | null;
  chamberName: string | null;
  logoImage: FileList | null;
  backgroundImage: FileList | null;
  cridentialImage: FileList | null;
  deliveryInTown: boolean | null;
  freeDeliveryInTown: boolean | null;
  payAtHomeInTown: boolean | null;
  deliveryInOtherCity: boolean | null;
  freeDeliveryInOtherCity: boolean | null;
  payAtHomeInOtherCity: boolean | null;
  address: string | null;
  cityId: number | null;
};

export default function MyForm() {
  const { setData, property } = useChamberHook();
  const [sendData, setSendadata] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      deliveryInTown: property.deliveryInTown,
      freeDeliveryInTown: property.freeDeliveryInTown,
      payAtHomeInTown: property.payAtHomeInTown,
      deliveryInOtherCity: property.deliveryInOtherCity,
      freeDeliveryInOtherCity: property.freeDeliveryInOtherCity,
      payAtHomeInOtherCity: property.freeDeliveryInOtherCity,
    },
  });
  const formData = new FormData();

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    setData({ property: data });
    setSendadata(true);
    // Handle the form data here
  };
  const url = "http://localhost:3001/api/chambers/new";
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjA5MTg5MDEwOTEyIiwicm9sZXMiOltdLCJpYXQiOjE3MTAyMzg5NzEsImV4cCI6MTcxMjgzMDk3MX0.igwzMPFaV3XNt_uXXz5vhuVKC-igal6bW4xNeb0L9xM";
  const hanseleSendData = async () => {
    if (property) {
      const propertyString = JSON.stringify(property);
      formData.append("property", propertyString);
    }
    if (property.backgroundImage && property.backgroundImage?.length > 0) {
      formData.append(
        "files",
        property.backgroundImage[0],
        "backgroundImage.jpg"
      );
    }
    if (property.cridentialImage && property.cridentialImage?.length > 0) {
      formData.append(
        "files",
        property.cridentialImage[0],
        "cridentialImage.jpg"
      );
    }
    if (property.logoImage && property.logoImage?.length > 0) {
      formData.append("files", property.logoImage[0], "logoImage.jpg");
    }
    try {
      await axios.post(url, formData, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("property=>", property);
    if (sendData) {
      hanseleSendData();
    }
    setSendadata(false);
  }, [sendData]);

  return (
    <div className='max-w-md mx-auto mt-8'>
      <div className='mb-4'>
        <label className='flex items-center'>
          Delivery in Town
          <input
            type='checkbox'
            {...register("deliveryInTown")}
            className='ml-2'
          />
        </label>
      </div>

      <div className='mb-4'>
        <label className='flex items-center'>
          Free Delivery in Town
          <input
            type='checkbox'
            {...register("freeDeliveryInTown")}
            className='ml-2'
          />
        </label>
      </div>

      <div className='mb-4'>
        <label className='flex items-center'>
          Pay at Home in Town
          <input
            type='checkbox'
            {...register("payAtHomeInTown")}
            className='ml-2'
          />
        </label>
      </div>

      <div className='mb-4'>
        <label className='flex items-center'>
          Delivery in Other City
          <input
            type='checkbox'
            {...register("deliveryInOtherCity")}
            className='ml-2'
          />
        </label>
      </div>

      <div className='mb-4'>
        <label className='flex items-center'>
          Free Delivery in Other City
          <input
            type='checkbox'
            {...register("freeDeliveryInOtherCity")}
            className='ml-2'
          />
        </label>
      </div>

      <div className='mb-4'>
        <label className='flex items-center'>
          Pay at Home in Other City
          <input
            type='checkbox'
            {...register("payAtHomeInOtherCity")}
            className='ml-2'
          />
        </label>
      </div>

      <button
        type='submit'
        className='bg-blue-500 text-white py-2 px-4 rounded'
        onClick={handleSubmit(onSubmit)}>
        Submit
      </button>
    </div>
  );
}
