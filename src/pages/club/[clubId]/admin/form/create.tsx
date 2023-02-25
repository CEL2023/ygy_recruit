import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { createClubForm } from "../../../../../api/form/api";
import FormPreview from "../../../../../components/FormPreview";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
  resetServerContext,
} from "react-beautiful-dnd";
import { GetServerSideProps } from "next";
type questionTypes = "short" | "multiple" | "paragraph" | "image" | "dropdown";
interface IField {
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

  const [formContent, setFormContent] = useState<IField[]>([]);
  const [onEdit, setOnEdit] = useState(false);
  const [textField, setTextField] = useState("");
  const [editedField, setEditedField] = useState<number | undefined>(0);
  const [maxRadio, setMaxRadio] = useState(2);
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
    const field = {
      id: formContent.length,
      question: "제목 설정",
      type: "short" as questionTypes, // "paragraph", "multichoice",
      list: [],
    };
    setFormContent([...formContent, field]);
  };

  const editField = (fieldName: number, fieldLabel: string) => {
    let newP;
    setFormContent((prev) => {
      newP = [...prev];
      newP[fieldName]!.question = fieldLabel;
      return newP;
    });
  };

  const editFieldType = (fieldName: number, fieldLabel: string) => {
    let newP;
    setFormContent((prev) => {
      newP = [...prev];
      newP[fieldName]!.type = fieldLabel as questionTypes;
      return newP;
    });
  };

  const addFieldOption = (fieldName: number, option: string) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f: IField) => f.id === fieldName);
    if (fieldIndex > -1) {
      if (option && option != "") {
        formFields[fieldIndex]!.list?.push(option);
        setFormContent(formFields);
        setTextField("");
      }
    }
  };
  const setMax = (fieldName: number, max: number) => {
    let newP;
    if (max && max > 0) {
      setFormContent((prev) => {
        newP = [...prev];
        newP[fieldName]!.maxSelect = max;
        return newP;
      });
      setMaxRadio(2);
    }
  };

  const sendForm = async () => {
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
                              <div
                                key={field.id}
                                className="block bg-white text-sm font-medium capitalize dark:bg-black "
                              >
                                {onEdit && editedField == field.id ? (
                                  <input
                                    type="text"
                                    value={field.question || ""}
                                    onChange={(e) => {
                                      editField(field.id, e.target.value || "");
                                    }}
                                  />
                                ) : (
                                  <label
                                    onClick={(e: any) => {
                                      setOnEdit(true);
                                      setEditedField(field.id);
                                    }}
                                  >
                                    {field.question}
                                  </label>
                                )}
                              </div>
                              <div>
                                <select
                                  className="dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                  onChange={(e) =>
                                    editFieldType(field.id, e.target.value)
                                  }
                                >
                                  <option value="short">단답형</option>
                                  <option value="paragraph">서술형</option>
                                  <option value="dropdown">드롭다운</option>
                                  <option value="multiple">복수선택</option>
                                  <option value="image">사진</option>
                                </select>
                              </div>
                            </div>

                            <div className="my-4">
                              {field.type == "multiple" && (
                                <div className="my-4 flex flex-col space-y-2">
                                  <fieldset>
                                    {field?.list?.map(
                                      (item: any, index: number) => (
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
                                      className="flex-1 rounded-l-md p-2 text-black dark:bg-white"
                                    />
                                    <button
                                      className="block rounded-r-md bg-indigo-700 px-4 text-white hover:bg-indigo-900"
                                      onClick={() =>
                                        addFieldOption(field.id, textField)
                                      }
                                    >
                                      추가
                                    </button>
                                  </div>
                                  <div className="space-between flex">
                                    <input
                                      type="text"
                                      onChange={(e) =>
                                        setMaxRadio(+e.target.value)
                                      }
                                      value={maxRadio || 2}
                                      placeholder="최대선택개수"
                                      className="flex-1 rounded-l-md p-2 text-black dark:bg-white"
                                    />
                                    <button
                                      className="block rounded-r-md bg-indigo-700 px-4 text-white hover:bg-indigo-900"
                                      onClick={() =>
                                        setMax(field.id, maxRadio ?? 2)
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
                                  className="shadow-xs block h-10 w-full rounded-md px-5  text-black dark:bg-white"
                                  placeholder={field.question}
                                />
                              )}
                              {field.type == "paragraph" && (
                                <textarea
                                  rows={4}
                                  className="block h-10 w-full rounded-md px-5 py-2 text-black shadow-sm dark:bg-white"
                                  placeholder={field.question}
                                />
                              )}
                              {field.type == "dropdown" && (
                                <div className="my-4 flex flex-col space-y-2">
                                  <select className="dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                                    {field?.list?.map(
                                      (item: any, index: number) => (
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
                                      className="flex-1 rounded-l-md p-2 text-black dark:bg-white"
                                    />
                                    <button
                                      className="block rounded-r-md bg-indigo-700 px-4 text-white hover:bg-indigo-900"
                                      onClick={() =>
                                        addFieldOption(field.id, textField)
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
                        className="text-md inline-flex w-full items-center justify-center rounded-md bg-green-700 px-3 py-2 text-center font-semibold text-white hover:bg-green-600"
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
