"use client";
import React from "react";
import { useForm } from "react-hook-form";
import useNameData from "../hook";

type Inputs = {
  deliveryInTown: boolean;
  freeDeliveryInTown: boolean;
  payAtHomeInTown: boolean;
  deliveryInOtherCity: boolean;
  freeDeliveryInOtherCity: boolean;
  payAtHomeInOtherCity: boolean;
};

export default function MyForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      deliveryInTown: false,
      freeDeliveryInTown: false,
      payAtHomeInTown: false,
      deliveryInOtherCity: false,
      freeDeliveryInOtherCity: false,
      payAtHomeInOtherCity: false,
    },
  });
  const { setData } = useNameData();

  const onSubmit = (data: Inputs) => {
    console.log(data);
    setData(data);
    // Handle the form data here
  };
  console.log(useNameData());
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
