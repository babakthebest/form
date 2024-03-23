"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";
import useChamberHook, { Chambers, ImageState } from "../hook2";

export default function MyForm() {
  const {
    setChamberData,
    property,
    setLogoImage,
    setBackgroundImage,
    setCridentialImage,
    logoImage,
    backgroundImage,
    cridentialImage,
  } = useChamberHook();
  const [sendData, setSendadata] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Chambers & ImageState>({
    defaultValues: {
      property: {
        deliveryInTown: property.deliveryInTown,
        freeDeliveryInTown: property.freeDeliveryInTown,
        payAtHomeInTown: property.payAtHomeInTown,
        deliveryInOtherCity: property.deliveryInOtherCity,
        freeDeliveryInOtherCity: property.freeDeliveryInOtherCity,
        payAtHomeInOtherCity: property.payAtHomeInOtherCity,
      },
    },
  });
  const formData = new FormData();

  const onSubmit: SubmitHandler<Chambers & ImageState> = async (data) => {
    console.log(data);
    setChamberData({
      property: data.property,
    });
    setSendadata(true);
    // Handle the form data here
  };
  const url = "http://localhost:3001/api/chambers/new";
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjA5MTg5MDEwOTEyIiwicm9sZXMiOltdLCJpYXQiOjE3MTA5MzgwMjUsImV4cCI6MTcxMzUzMDAyNX0.AR_YCJG-xrcFpeQnajfqYDg4VqJDy6Cdd3-UtL3aBB4";
  const hanseleSendData = async () => {
    if (property) {
      const propertyString = JSON.stringify(property);
      formData.append("property", propertyString);
    }
    if (backgroundImage && backgroundImage?.length > 0) {
      formData.append("images[]", backgroundImage[0], "backgroundImage.jpg");
    }
    if (cridentialImage && cridentialImage?.length > 0) {
      formData.append("images[]", cridentialImage[0], "cridentialImage.jpg");
    }
    if (logoImage && logoImage?.length > 0) {
      formData.append("images[]", logoImage[0], "logoImage.jpg");
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
  console.log("property in step2",property);
  useEffect(() => {
    console.log("logoImage=>", logoImage);
    if (sendData) {
      hanseleSendData();
    }
    setSendadata(false);
  }, [sendData]);

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label className="flex items-center">
          Delivery in Town
          <input
            type="checkbox"
            {...register("property.deliveryInTown")}
            className="ml-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          Free Delivery in Town
          <input
            type="checkbox"
            {...register("property.freeDeliveryInTown")}
            className="ml-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          Pay at Home in Town
          <input
            type="checkbox"
            {...register("property.payAtHomeInTown")}
            className="ml-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          Delivery in Other City
          <input
            type="checkbox"
            {...register("property.deliveryInOtherCity")}
            className="ml-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          Free Delivery in Other City
          <input
            type="checkbox"
            {...register("property.freeDeliveryInOtherCity")}
            className="ml-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          Pay at Home in Other City
          <input
            type="checkbox"
            {...register("property.payAtHomeInOtherCity")}
            className="ml-2"
          />
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </div>
  );
}
