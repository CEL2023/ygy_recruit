import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { submitEnroll } from "../../api/enroll/api";
import { fetcher } from "../../api/fetcher";
import { validate } from "../../lib/validate";
import { IField } from "../../pages/club/[clubId]/admin/form/create";
import { useAsk } from "../../zustand/AskStore";
import { useGlobalModal } from "../../zustand/GlobalModalStore";
import { usePriorityTab } from "../../zustand/PriorityStore";
import BasicLoader from "../Global/Loaders/BasicLoader";
interface props {
  formId: number;
  clubId: number;
  formContent: IField[];
  title: string;
  subTitle: string;
  formAnswer?: any;
}
function FormRegisterView({
  formContent,
  title,
  subTitle,
  formId,
  clubId,
  formAnswer,
}: props) {
  const { setGMOpen } = useGlobalModal();
  const { push, back } = useRouter();
  const [loading, setLoading] = useState(false);
  const [waitingForPriorty, setWFPR] = useState(false);
  const [formData, setFormData] = useState<any>();
  useEffect(() => {
    console.log({ formContent });
    if (formContent?.length == 0) {
      back();
      setLoading(false);
      setGMOpen(true, {
        content:
          "아직 생성된 폼이 없습니다 관리자에게 문의하거나 다시 시도해주세요",
        title: "알림",
      });
      setLoading(false);
      return;
    }
    if (!formContent?.length) return setLoading(true);
    return setLoading(false);
  }, [formContent]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formAnswer ?? undefined,
  });
  const [saveMethod, setSave] = useState(false);
  const { selectedPriority, setPTOpen, isOpen } = usePriorityTab();
  const { mutateAsync } = useMutation({
    mutationKey: ["club/enroll", formId],
    useErrorBoundary: false,
    mutationFn: ({ saveMethod, priority, ...data }: any) =>
      submitEnroll(formId, clubId, saveMethod, priority, data!),
    onSuccess: (data, variables, context) => {
      setGMOpen(true, {
        title: "축하합니다",
        content: "성공적으로 제출되었습니다",
      });
    },
    onError: () => {
      setGMOpen(true, {
        title: "오류",
        content: "제출에 실패하였습니다",
      });
    },
  });
  const realSubmit = async () => {
    await mutateAsync({ ...formData, saveMethod, priority: selectedPriority });
    await push("/me/enrolls");
  };
  const submit: SubmitHandler<any> = async (data) => {
    if (saveMethod == false) {
      await mutateAsync({ ...data, saveMethod });
      await push("/me/enrolls");
      return;
    }
    const possible = await fetcher.get<number[]>("/api/v1/me/possiblePriority");
    if (possible.data.length == 0) {
      setGMOpen(true, {
        content: "더 이상 지원할 수 없습니다",
        title: "경고",
      });
      return;
    }
    setWFPR(true);
    setFormData(data);
    setPTOpen(true, { priorityLists: possible.data });
  };
  const submitAction = async () => {
    await realSubmit();
    setWFPR(false);
  };
  useEffect(() => {
    if (waitingForPriorty && !isOpen && selectedPriority != null) {
      submitAction();
    }
  }, [isOpen]);
  return (
    <>
      {loading ? (
        <BasicLoader />
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          <div className="mt-8 mb-4 flex w-full flex-col space-y-2">
            <h1 className="text-center text-6xl font-bold">{title}</h1>
            <h2 className="text-center text-4xl font-semibold">{subTitle}</h2>
          </div>
          <div className="my-10 rounded-xl p-5 shadow-lg">
            {formContent.map((field: IField, index: number) => {
              return (
                <div key={index}>
                  <div className="flex items-center justify-between space-y-2">
                    <div
                      key={field.id}
                      className="block text-sm font-medium capitalize "
                    >
                      <label onClick={() => {}}>{field.question}</label>
                    </div>
                  </div>

                  <div key={field.id} className="my-4">
                    {field.type == "multiple" && (
                      <div className="my-4 flex flex-col space-y-2">
                        <fieldset>
                          <label className=" my-8">
                            최대 {field.maxSelect ?? 2}개
                          </label>
                          {field?.list?.map((item: string, index: number) => (
                            <div
                              key={index}
                              className="m-2 flex items-center rounded-lg border border-gray-200 pl-4 dark:border-gray-700"
                            >
                              <input
                                id={`${item}-radio-${index}`}
                                {...register(
                                  `checkbox[${field.id}][${index}]`,
                                  {
                                    validate: {
                                      isOk: (
                                        value: string,
                                        formValue: { checkbox: string[][] }
                                      ) => {
                                        if (index == 0) {
                                          if (
                                            (field?.maxSelect ?? 2) >=
                                              formValue?.checkbox[
                                                field.id
                                              ]!.filter(
                                                (item: string | boolean) =>
                                                  item !== false
                                              ).length &&
                                            formValue?.checkbox[
                                              field.id
                                            ]!.filter(
                                              (item: string | boolean) =>
                                                item !== false
                                            ).length >= 1
                                          ) {
                                            return true;
                                          }
                                          return false;
                                        }
                                        return true;
                                      },
                                    },
                                  }
                                )}
                                type="checkbox"
                                key={item}
                                value={item}
                                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                              />
                              <label
                                className="ml-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                                htmlFor={`${item}-checkbox-${index}`}
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </fieldset>
                      </div>
                    )}
                    {field.type == "short" && (
                      <input
                        type="text"
                        {...register(`short[${field.id}]`, {
                          required: {
                            value: true,
                            message: "아직 작성되지 않은 항목이 존재합니다",
                          },
                        })}
                        className="shadow-xs block h-10 w-full rounded-md border px-5 text-black dark:bg-white"
                        placeholder={"답을 입력해주세요"}
                      />
                    )}
                    {field.type == "paragraph" && (
                      <TextareaAutosize
                        {...register(`paragraph[${field.id}]`, {
                          required: {
                            value: true,
                            message: "아직 작성되지 않은 항목이 존재합니다",
                          },
                        })}
                        rows={4}
                        className="block h-10 w-full rounded-md border px-5 py-2 text-black shadow-sm dark:bg-white"
                        placeholder={"답을 입력해주세요"}
                      />
                    )}
                    {field.type == "dropdown" && (
                      <select
                        {...register(`dropdown[${field.id}]`)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      >
                        {field?.list?.map((item: any) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="my-4 text-center text-xs italic text-red-500">
            {Object.keys(errors).map((key, idx) => {
              //@ts-ignore
              return <p key={idx}>{errors[key]?.message}</p>;
            })}
          </div>
          <div className="mx-auto flex items-center justify-center gap-2">
            <button
              type="submit"
              className="mx-auto w-full rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
              onClick={() => {
                setSave(true);
              }}
            >
              폼 제출하기
            </button>
            <button
              type="submit"
              className="mx-auto w-full rounded-xl bg-green-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-green-400"
              onClick={() => {
                setSave(false);
              }}
            >
              임시 저장하기
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default FormRegisterView;
