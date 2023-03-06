import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { fetcher } from "../api/fetcher";
import { MINLENGTH } from "../constant/validationRules";
export interface ISignIn {
  username: string;
  password: string;
}
export interface IUser {
  id: number;
  clubId: number;
  email: string;
  username: string;
  name: string;
  studentId: number;
  passwordHash: string;
  rank: number;
  isManageAdmin: boolean;
  createdAt: Date;
}
export interface ISignInUser {
  user: IUser;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>();
  const router = useRouter();
  const login: SubmitHandler<ISignIn> = async (data) => {
    try {
      const loggingin = await fetcher.post<ISignInUser>(
        "/api/v1/auth/signin",
        data
      );
      if (!loggingin || !loggingin?.data?.user) throw new Error("Error");

      await router.push("/");
      router.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const disablebutton = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="container z-0 mx-auto max-w-lg px-5 py-10">
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
              placeholder="아이디"
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
              placeholder="비밀번호"
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
              로그인
            </button>
          </div>
          <div className="my-2 text-center">또는</div>
          <div className="flex flex-col items-center justify-center">
            <Link
              className="text-indigo-700 dark:text-sky-300"
              href={"/signup"}
            >
              가입하기
            </Link>
            <Link
              className="text-indigo-700 dark:text-sky-300"
              href={"/find-my-pwd"}
            >
              비밀번호를 잊으셨나요? 비밀번호 찾기
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;
