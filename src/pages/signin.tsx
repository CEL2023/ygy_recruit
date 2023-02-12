import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FetchClient, fetcher } from "../api/fetcher";
import { MINLENGTH } from "../constant/validationRules";
export interface ISignIn {
  username: string;
  password: string;
}

export interface ISignInUser {
  user: {
    id: number;
    clubId: number;
    email: string;
    username: string;
    name: string;
    studentId: number;
    passwordHash: string;
    profImg: string;
    rank: number;
    isManageAdmin: boolean;
    createdAt: Date;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
function signin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignIn>();
  const router = useRouter();
  const login: SubmitHandler<ISignIn> = async (data) => {
    try {
      const loggingin = await fetcher.post<ISignInUser>(
        "/api/v1/auth/signin",
        data
      );
      console.log(loggingin);
      if (loggingin.data.user) {
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const disablebutton = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="container mx-auto max-w-lg px-5 py-10">
        <div className="mb-12 text-center">
          <h1 className="light:text-white text-4xl font-semibold md:text-4xl">
            Sign In
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(login)}
          className="mb-2 rounded px-8 pt-6 pb-4"
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="text">
              아이디
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight  shadow focus:outline-none"
              id="username"
              type="text"
              placeholder="username"
              {...register("username", {
                required: "userid is required",
                minLength: MINLENGTH,
              })}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold " htmlFor="password">
              비밀번호
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight  shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 2,
                  message: "Password should be more than 8 letters",
                },
              })}
            />
          </div>
          <div className="my-4 text-center text-xs italic text-red-500">
            {Object.keys(errors).map((key, idx) => {
              return <p key={idx}>{errors[key as keyof ISignIn]?.message}</p>;
            })}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline w-full rounded bg-indigo-400 py-2 px-4 font-bold text-white hover:bg-indigo-700 focus:outline-none"
              type="submit"
              ref={disablebutton}
            >
              Sign In
            </button>
          </div>
          <div className="my-2 text-center">OR</div>
          <div className="flex items-center justify-center">
            <Link
              className="text-indigo-700 dark:text-sky-300"
              href={"/signup"}
            >
              SIGN UP
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default signin;
