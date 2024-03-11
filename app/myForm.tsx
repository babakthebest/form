"use client";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsCloudUpload } from "react-icons/bs";

type Inputs = {
  example: string;
  exampleRequired: string;
  logoImage: FileList;
};
export default function MyForm() {
  return <Link href={"/section/step1"}>go to form </Link>;
}
