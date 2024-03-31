"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCloudUpload } from "react-icons/bs";
import ImageField from "./imageField";
import useChamberHook, { Chambers, ImageState } from "../hook2";
import SelectCity from "./SelectCity";

export default function Step() {
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
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Chambers & ImageState>({
    defaultValues: {
      property: {
        description: property.description,
        chamberName: property.chamberName,
        cityId: property.cityId,
        address: property.address,
      },
      logoImage: logoImage,
      cridentialImage: cridentialImage,
      backgroundImage: backgroundImage,
    },
  });
  const watchlogoImage = watch("logoImage");
  // console.log("logoImage=>", logoImage);
  const watchbackgroundImage = watch("backgroundImage");
  const watchcridentialImage = watch("cridentialImage");
  const router = useRouter();
  // console.log("errors", errors);
  const onSubmit: SubmitHandler<Chambers & ImageState> = (data) => {
    console.log("datais in first step=>", data);
    setChamberData({
      property: data.property,
    });
    setLogoImage(data.logoImage);
    setBackgroundImage(data.backgroundImage);
    setCridentialImage(data.cridentialImage);

    router.push("/section/step2");
  };
  // console.log(useChamberHook());
  //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.files) {
  //       setValue("logoImage", event.target.files);
  //     }
  //   };
  //   console.log(watch("description")); // watch input value by passing the name of it
  // console.log("errors=>", errors?.chamberName?.message);
  // console.log("errors2=>", errors.logoImage);
  console.log("property in step1", property);
  console.log("errors in step1", errors);
  return (
    <div className="w-full h-full">
      <div className=" justify-center items-center flex-col">
        <div className="flex">
          <input
            id="description"
            {...register("property.description")}
            className="border-2 focus:outline-none rounded-lg border-emerald-500 mt-2 "
            type="text"
          />
          <label htmlFor="description">description</label>
        </div>
        <div className="flex">
          <input
            id="chamberName"
            className="border-2 focus:outline-none rounded-lg border-emerald-500  mt-2"
            type="text"
            {...register("property.chamberName", {
              required: { value: true, message: "the field is requiered 0" },
            })}
          />
          <label htmlFor="chamberName">chamberName</label>
        </div>
        {errors.property?.chamberName && (
          <span>{errors.property?.chamberName.message}</span>
        )}
        <div className="flex">
          <input
            id="address"
            className="border-2 focus:outline-none rounded-lg border-emerald-500  mt-2"
            type="text"
            {...register("property.address", {
              required: { value: true, message: "the field is requiered 0" },
            })}
          />
          <label htmlFor="address">address</label>
        </div>
        {errors.property?.address && (
          <span>{errors.property?.address.message}</span>
        )}
        {/* <div className="flex">
          <input
            id="cityId"
            className="border-2 focus:outline-none rounded-lg border-emerald-500  mt-2"
            type="number"
            {...register("property.cityId", {
              required: { value: true, message: "the field is requiered 0" },
              setValueAs: (v) => parseInt(v),
            })}
          />
          <label htmlFor="cityId">cityId</label>
        </div>
        {errors.property?.cityId && (
          <span>{errors.property?.cityId.message}</span>
        )} */}
        {/* <div className="flex mt-4">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            id="logoImage"
            {...register("logoImage", {
              required: { value: true, message: "The field is required 1" },
              setValueAs: (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e?.target?.files) {
                  setValue("logoImage", e?.target?.files);
                }
              },
            })}
          />
          <label
            htmlFor="logoImage"
            className="cursor-pointer bg-blue-500 text-white p-2 rounded-md flex items-center justify-center"
          >
            <BsCloudUpload />
            logo
          </label>
          {watchlogoImage && <span className="mt-2">{watchlogoImage[0]?.name}</span>}
        </div>
        {errors.logoImage && <span>{errors.logoImage.message}</span>} */}
        <ImageField
          files={backgroundImage}
          setFiles={setBackgroundImage}
          set={setValue}
          register={register}
          formError={errors}
          id="backgroundImage"
          required={true}
          maxFiles={1}
          maxSize={1024 * 1024 * 5}
        ></ImageField>
        <ImageField
          files={cridentialImage}
          setFiles={setCridentialImage}
          set={setValue}
          register={register}
          formError={errors}
          id="cridentialImage"
          required={true}
          maxFiles={1}
          maxSize={1024 * 1024 * 3}
        ></ImageField>
        <ImageField
          files={logoImage}
          setFiles={setLogoImage}
          set={setValue}
          register={register}
          formError={errors}
          id="logoImage"
          required={true}
          maxFiles={2}
          maxSize={1024 * 1024 * 3}
        ></ImageField>
        <SelectCity register={register} set={setValue} id="property.cityId" />
        <button onClick={handleSubmit(onSubmit)}>submit</button>
      </div>
    </div>
  );
}
