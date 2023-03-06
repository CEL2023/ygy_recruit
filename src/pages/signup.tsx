import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { fetcher } from "../api/fetcher";
import { MINLENGTH } from "../constant/validationRules";
export interface ISignUp {
  username: string;
  email: string;
  password: string;
  studentId: number;
  name: string;
  phoneNum: string;
}
function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>();
  const router = useRouter();
  const signUp: SubmitHandler<ISignUp> = async ({
    username,
    email,
    password,
    studentId,
    name,
    phoneNum,
  }) => {
    try {
      const loggingin = await fetcher.post("/api/v1/auth/signup", {
        username,
        email,
        password,
        studentId: parseInt(studentId.toString()),
        name,
        phoneNum,
      });
      if (!loggingin) throw new Error("Error");

      await router.push("/");
      router.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-lg px-5 py-10">
        <div className="mb-12 text-center">
          <h1 className="light:text-gray-700 text-4xl font-semibold md:text-4xl">
            Sign Up
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(signUp)}
          className="mb-2 rounded px-8 pt-6 pb-4"
        >
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold " htmlFor="text">
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
            <label className="mb-2 block text-sm font-bold " htmlFor="text">
              이름
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight  shadow focus:outline-none"
              id="name"
              type="text"
              placeholder="본인 이름"
              {...register("name", {
                required: "userid is required",
              })}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold "
              htmlFor="studentId"
            >
              학번
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight  shadow focus:outline-none"
              id="studentId"
              type="number"
              placeholder="학번"
              {...register("studentId", {
                required: true,
                pattern: {
                  value: /^[a-z0-9]{5}$/i,
                  message: "학번은 5자리 숫자",
                },
              })}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold " htmlFor="email">
              이메일
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight  shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="이메일"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: "이메일 형식이 아닙니다.",
                },
              })}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold " htmlFor="phoneNum">
              전화번호
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight  shadow focus:outline-none"
              id="phoneNum"
              type="tel"
              placeholder="전화번호"
              {...register("phoneNum", {
                required: true,
                pattern: {
                  value: /^\d{2,3}-?\d{3,4}-?\d{4}$/,
                  message: "전화번호가 아닙니다",
                },
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
              type="비밀번호"
              placeholder="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: MINLENGTH,
                  message: "Password should be more than 8 letters",
                },
              })}
            />
          </div>
          <div className="my-4 text-center text-xs italic text-red-500">
            {Object.keys(errors).map((key, idx) => {
              return <p key={idx}>{errors[key as keyof ISignUp]?.message}</p>;
            })}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline w-full rounded bg-indigo-400 py-2 px-4 font-bold text-white hover:bg-indigo-700 focus:outline-none"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="my-2 text-center">OR</div>
          <div className="flex items-center justify-center">
            <Link
              className="text-indigo-700 dark:text-sky-300"
              href={"/signin"}
            >
              SIGN IN
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
