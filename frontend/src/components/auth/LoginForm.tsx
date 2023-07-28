"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthInput from "./AuthInput";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/features/userSlice";
import { DotLoader } from "react-spinners";
import Cookies from "js-cookie";

const formSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(128, "Password must be less than 32 characters."),
});
type FormSchemaType = z.infer<typeof formSchema>;
type Props = {};

export default function LoginForm({}: Props) {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.user);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    let res = await dispatch(loginUser({ ...data }));
    if (res.payload.user) {
      Cookies.set("usertoken", res.payload.user.access_token);
      router.push("/");
      // router.push("/");
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      {/* container */}
      <div className="w-full max-w-md space-y-8 rounded-xl p-10 dark:bg-dark_bg_2">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
        {/* Form */}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
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
              "Sign in"
            )}
          </button>
          {/* Sign up link */}
          <p className="text-md mt-10 flex flex-col items-center text-center dark:text-dark_text_1">
            <span>do not have an account ?</span>
            <Link
              href="/register"
              className="cursor-pointer transition duration-300 ease-in hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
