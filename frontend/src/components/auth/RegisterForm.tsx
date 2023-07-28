"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthInput from "./AuthInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeStatus, registerUser } from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import { DotLoader } from "react-spinners";
import Link from "next/link";
import { useState } from "react";
import Picture from "./Picture";
import axios from "axios";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(32, "First name must be less than 32 characters.")
    .regex(new RegExp("^[a-zA-Z]+$"), "Special characters are not allowed."),
  email: z.string().email("invalid email address"),
  status: z.string().max(60, "Status must be less than 60 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(128, "Password must be less than 32 characters."),
});
type FormSchemaType = z.infer<typeof formSchema>;
type Props = {};

const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;
const cloud_secret = process.env.NEXT_PUBLIC_CLOUD_SECRET as string | Blob;
export default function RegisterForm({}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.user);
  const [picture, setPicture] = useState<any>("");
  const [readablePicture, setReadablePicture] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    dispatch(changeStatus("loading"));
    if (picture) {
      //upload to cloudinary and then register user
      await uploadImage().then(async (cloudinary_data) => {
        let res = await dispatch(
          registerUser({ ...data, picture: cloudinary_data.secure_url })
        );
        if (res.payload.user) {
          router.push("/");
        }
      });
    } else {
      let res = await dispatch(registerUser({ ...data, picture: "" }));
      if (res.payload.user) {
        router.push("/");
      }
    }
  };
  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    // console.log(data);
    return data;
  };
  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      {/* container */}
      <div className="max-w-md space-y-8 rounded-xl p-10 dark:bg-dark_bg_2">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/* Form */}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            name="name"
            type="text"
            placeholder="Full Name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {/* Picture */}
          <Picture
            readablePicture={readablePicture}
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
          />
          {/* if we have an error */}
          {error && (
            <div>
              <p className=" text-red-400">{error}</p>
            </div>
          )}
          <button
            className="flex w-full cursor-pointer justify-center rounded-full bg-green_1 p-4 font-semibold tracking-wide text-gray-100 shadow-lg transition duration-100 ease-in hover:bg-green_2 focus:outline-none"
            type="submit"
          >
            {status === "loading" ? (
              <DotLoader color="#fff" size={28} />
            ) : (
              "Sign up"
            )}
          </button>
          {/* Sign in link */}
          <p className="text-md mt-10 flex flex-col items-center text-center dark:text-dark_text_1">
            <span>have an account ?</span>
            <Link
              href="/login"
              className="cursor-pointer transition duration-300 ease-in hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
