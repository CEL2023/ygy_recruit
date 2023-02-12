import Link from "next/link";
import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MINLENGTH } from "../constant/validationRules";
export interface ISignIn {
  username: string;
  email: string;
  password: string;
  studentId: number;
}

function signin() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignIn>();
  const login: SubmitHandler<ISignIn> = async (data) => {};
  const disablebutton = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="container mx-auto max-w-lg px-5 py-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold text-gray-700 md:text-4xl">
            Sign In
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(login)}
          className="mb-2 rounded bg-white px-8 pt-6 pb-4 shadow"
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="text"
            >
              userid
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="userid"
              type="text"
              placeholder="userid"
              {...register("username", {
                required: "userid is required",
                minLength: MINLENGTH,
              })}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: MINLENGTH,
                  message: "Password should be more than 8 letters",
                },
              })}
            />
            <div className="my-4 text-center text-xs italic text-red-500">
              <p>{errors?.username?.message}</p>
              <p>{errors?.password?.message}</p>
            </div>
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
            <Link className="text-indigo-700" href={"/signup"}>
              SIGN UP
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default signin;
