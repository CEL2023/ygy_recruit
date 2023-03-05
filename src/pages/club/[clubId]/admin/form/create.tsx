import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { createClubForm } from "../../../../../api/form/api";
import FormPreview from "../../../../../components/FormViews/FormPreview";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import { GetServerSideProps } from "next";
import { XIcon } from "@heroicons/react/solid";
import { useGlobalModal } from "../../../../../zustand/GlobalModalStore";
import QTitle from "../../../../../components/FormContents/QTitle";
import QCreateTools from "../../../../../components/FormContents/QCreateTools";
type questionTypes = "short" | "multiple" | "paragraph" | "dropdown";
export interface IField {
  id: number;
  question: string;
  type: questionTypes;
  list?: string[];
  maxSelect?: number;
}
export default function Form() {
  const {
    query: { clubId },
    push,
  } = useRouter();
  const { setGMOpen } = useGlobalModal();
  const [formContent, setFormContent] = useState<IField[]>([]);
  const [onEdit, setOnEdit] = useState(false);
  const [textField, setTextField] = useState("");
  const [editedField, setEditedField] = useState<number | undefined>(0);
  const [maxRadio, setMaxRadio] = useState(0);
  const { mutateAsync } = useMutation({
    mutationKey: [`form/create/club`, clubId],
    mutationFn: () => createClubForm(clubId!, { content: formContent }),
    onSuccess: () => {
      push(`/club/${clubId}/admin`);
    },
    onError: () => {
      //;
    },
  });
  const addQuestion = () => {
    const field: IField = {
      id: formContent.length,
      question: "제목 설정",
      type: "short" as questionTypes, // "paragraph", "multichoice",
      list: [],
    };
    setFormContent([...formContent, field]);
  };
  const deleteQuestion = ({ id }: { id: number }) => {
    setFormContent((prev: IField[]) =>
      prev.filter((item: IField) => {
        return item.id !== id;
      })
    );
  };
  const deleteList = ({ id }: { id: number }) => {
    setFormContent((prev: IField[]) =>
      prev.filter((item: IField) => {
        return item.id !== id;
      })
    );
  };
  const editField = ({ id, label }: { id: number; label: string }) => {
    let newP;
    setFormContent((prev) => {
      newP = [...prev];
      newP[id]!.question = label;
      return newP;
    });
  };

  const editFieldType = ({ id, Qtype }: { id: number; Qtype: string }) => {
    let newP;
    setFormContent((prev) => {
      newP = [...prev];
      newP[id]!.type = Qtype as questionTypes;
      return newP;
    });
  };

  const addFieldOption = ({ id, label }: { id: number; label: string }) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f: IField) => f.id === id);
    if (fieldIndex > -1) {
      if (label && label != "") {
        formFields[fieldIndex]!.list?.push(label);
        setFormContent(formFields);
        setTextField("");
      }
    }
  };
  const setMax = ({ id, max }: { id: number; max: number }) => {
    let newP;
    if (max && max > 0) {
      setFormContent((prev) => {
        newP = [...prev];
        newP[id]!.maxSelect = max;
        return newP;
      });
    }
  };

  const sendForm = async () => {
    if (
      formContent.length < 1 ||
      formContent
        .filter((item) => item.type === ("dropdown" || "multiple"))
        .filter((ele) => !ele?.list || ele.list?.length < 2).length > 0
    ) {
      setGMOpen(true, {
        title: "알림",
        content:
          "최소 1개의 질문이 필요합니다. 복수선택이나 드롭다운은 2개 이상의 보기를 필요로 합니다",
      });
      return;
    }
    await mutateAsync();
  };

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    setFormContent((prev) => {
      const mutablePrevious = [...prev];
      const immutablePrevious = [...prev];
      mutablePrevious.splice(source.index, 1);
      mutablePrevious.splice(
        destination?.index,
        0,
        immutablePrevious[parseInt(draggableId)]!
      );
      const returnArr = mutablePrevious.map((item, index) => {
        const returnItem = { ...item };
        returnItem.id = index;
        return returnItem;
      });
      return returnArr;
    });
  };
  return (
    <div className="container mx-auto h-fit w-auto items-center justify-center rounded-lg p-4 px-4 shadow-lg">
      <div className="flex gap-2">
        <DragDropContext onDragEnd={onDragEnd} onDragStart={() => {}}>
          <Droppable droppableId="main">
            {(context) => (
              <div
                {...context.droppableProps}
                ref={context.innerRef}
                className=" w-full md:w-1/2"
              >
                <div className="my-4 flex w-full flex-col space-y-2">
                  <h1 className="text-2xl font-bold">폼 생성하기</h1>
                </div>
                <div className="my-10 rounded-xl p-5 shadow-lg">
                  {formContent.map((field) => {
                    return (
                      <Draggable
                        draggableId={field.id.toString()}
                        key={`${field.id}_question`}
                        index={field.id}
                      >
                        {(context) => (
                          <div
                            {...context.dragHandleProps}
                            {...context.draggableProps}
                            ref={context.innerRef}
                          >
                            <div className="flex items-center justify-between space-y-2">
                              <QTitle
                                editedField={editedField}
                                id={field.id}
                                question={field.question}
                                onChange={editField}
                                onClick={() => {
                                  setOnEdit(true);
                                  setEditedField(field.id);
                                }}
                                onEdit={onEdit}
                              />
                              <QCreateTools
                                id={field.id}
                                deleteQuestion={deleteQuestion}
                                onTypeChange={editFieldType}
                              />
                            </div>
                            <div className="my-4">
                              {field.type == "multiple" && (
                                <div className="my-4 flex flex-col space-y-2">
                                  <fieldset>
                                    {field?.list?.map(
                                      (item: string, index: number) => (
                                        <div
                                          key={`${item}_${index}_${field.id}_multiple`}
                                          className="flex items-center rounded border border-gray-200 pl-4 dark:border-gray-700"
                                        >
                                          <input
                                            id={`${item}-checkbox-${index}`}
                                            type="checkbox"
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
                                      )
                                    )}
                                  </fieldset>
                                  <div className="space-between flex">
                                    <input
                                      type="text"
                                      onChange={(e) => {
                                        setEditedField(field.id);
                                        setTextField(e.target.value || "");
                                      }}
                                      value={
                                        editedField == field.id
                                          ? textField
                                          : undefined || ""
                                      }
                                      placeholder="옵션추가"
                                      className="flex-1 rounded-l-md border p-2 text-black dark:bg-white"
                                    />
                                    <button
                                      className="block rounded-r-md bg-indigo-700 px-4 text-white hover:bg-indigo-900"
                                      onClick={() =>
                                        addFieldOption({
                                          id: field.id,
                                          label: textField || "",
                                        })
                                      }
                                    >
                                      추가
                                    </button>
                                  </div>
                                  <div className="space-between flex">
                                    <input
                                      type="text"
                                      onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (Number.isNaN(value)) {
                                          return;
                                        }
                                        setMaxRadio(value);
                                      }}
                                      onBlur={(e) => {
                                        if (e.target.value === "0") {
                                          setMaxRadio(2);
                                        }
                                      }}
                                      value={maxRadio}
                                      placeholder="최대선택개수"
                                      className="flex-1 rounded-l-md border p-2 text-black dark:bg-white"
                                    />
                                    <button
                                      className="rounded-r-md  bg-indigo-700 px-4 text-white hover:bg-indigo-900"
                                      onClick={() =>
                                        setMax({
                                          id: field.id,
                                          max: maxRadio ?? 2,
                                        })
                                      }
                                    >
                                      설정
                                    </button>
                                  </div>
                                </div>
                              )}
                              {field.type == "short" && (
                                <input
                                  type="text"
                                  className="shadow-xs block h-10 w-full rounded-md border px-5  text-black dark:bg-white"
                                  placeholder={field.question}
                                />
                              )}
                              {field.type == "paragraph" && (
                                <textarea
                                  rows={4}
                                  className="block h-10 w-full rounded-md border px-5  py-2 text-black shadow-sm dark:bg-white"
                                  placeholder={field.question}
                                />
                              )}
                              {field.type == "dropdown" && (
                                <div className="my-4 flex flex-col space-y-2">
                                  <select className="dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                                    {field?.list?.map(
                                      (item: string, index: number) => (
                                        <option
                                          key={`${item}_${index}_${field.id}_DD`}
                                          value={item}
                                        >
                                          {item}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <div className="space-between flex">
                                    <input
                                      type="text"
                                      onChange={(e) => {
                                        setEditedField(field.id);
                                        setTextField(e.target.value || "");
                                      }}
                                      value={
                                        editedField == field.id
                                          ? textField
                                          : undefined || ""
                                      }
                                      placeholder="옵션추가"
                                      className="flex-1 rounded-l-md border p-2 text-black dark:bg-white "
                                    />
                                    <button
                                      className="block rounded-r-md bg-indigo-700 px-4 text-white hover:bg-indigo-900"
                                      onClick={() =>
                                        addFieldOption({
                                          id: field.id,
                                          label: textField || "",
                                        })
                                      }
                                    >
                                      추가
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {context.placeholder}
                  <div className="relative w-full p-5">
                    <div className="absolute inset-x-0 bottom-0 flex w-full justify-center">
                      <button
                        onClick={() => addQuestion()}
                        className="text-md mt-4 inline-flex w-full items-center justify-center rounded-md bg-green-700 px-3 py-2 text-center font-semibold text-white hover:bg-green-600"
                      >
                        질문 추가
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className=" hidden md:block md:w-1/2">
          <FormPreview formContent={formContent} title="preview" subTitle="" />
        </div>
      </div>
      <div className="mx-auto items-center justify-center">
        <button
          className="mx-auto w-full rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
          onClick={sendForm}
        >
          폼 저장하기
        </button>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};
