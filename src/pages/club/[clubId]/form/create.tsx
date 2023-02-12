import React, { useState } from "react";
type questionTypes = "short" | "multiple" | "paragraph" | "image" | "dropdown";
interface IField {
  id: number;
  question: string;
  type: questionTypes;
  list?: string[];
  maxSelect?: number;
}
export default function Form() {
  const [formContent, setFormContent] = useState<IField[]>([]);
  const [onEdit, setOnEdit] = useState(false);
  const [textField, setTextField] = useState("");
  const [editedField, setEditedField] = useState<number | undefined>(0);
  const [maxRadio, setMaxRadio] = useState(2);

  const addQuestion = () => {
    const field = {
      id: formContent.length,
      question: "Untitled question",
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

  return (
    <div className="container mx-auto flex h-screen w-auto flex-row px-4">
      <div className=" w-1/2">
        <div className="my-4 flex w-full flex-col space-y-2">
          <h1 className="text-2xl font-bold">Form Maker</h1>
          <h2 className="text-lg">Untitled Form</h2>
        </div>
        <div className="my-10 rounded-md bg-white p-5 shadow-lg">
          {formContent.map((field) => {
            return (
              <div>
                <div className="flex items-center justify-between space-y-2">
                  <div
                    key={field.id}
                    className="block text-sm font-medium capitalize text-gray-700"
                  >
                    {onEdit && editedField == field.id ? (
                      <input
                        type="text"
                        value={field.question}
                        onChange={(e) => {
                          editField(field.id, e.target.value);
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
                      onChange={(e) => editFieldType(field.id, e.target.value)}
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
                        {field?.list?.map((item: any) => (
                          <div>
                            <input type="radio" key={item} value={item} />
                            <label>{item}</label>
                          </div>
                        ))}
                      </fieldset>
                      <div className="space-between flex">
                        <input
                          type="text"
                          onChange={(e) => {
                            setEditedField(field.id);
                            setTextField(e.target.value);
                          }}
                          value={
                            editedField == field.id ? textField : undefined
                          }
                          placeholder="Add an option"
                          className="flex-1"
                        />
                        <button
                          className="block bg-indigo-700 px-4 text-white hover:bg-indigo-900"
                          onClick={() => addFieldOption(field.id, textField)}
                        >
                          Add
                        </button>
                      </div>
                      <div className="space-between flex">
                        <input
                          type="text"
                          onChange={(e) => setMaxRadio(+e.target.value)}
                          value={maxRadio}
                          placeholder="Add an option"
                          className="flex-1"
                        />
                        <button
                          className="block bg-indigo-700 px-4 text-white hover:bg-indigo-900"
                          onClick={() => setMax(field.id, maxRadio)}
                        >
                          Set
                        </button>
                      </div>
                    </div>
                  )}
                  {field.type == "short" && (
                    <input
                      type="text"
                      className="block h-10 w-full rounded-md px-5 shadow-sm"
                      placeholder={field.question}
                    />
                  )}
                  {field.type == "paragraph" && (
                    <textarea
                      rows={4}
                      className="block h-10 w-full rounded-md px-5 shadow-sm"
                      placeholder={field.question}
                    />
                  )}
                  {field.type == "dropdown" && (
                    <div className="my-4 flex flex-col space-y-2">
                      <select className="block h-10 w-full rounded-md px-5 shadow-sm">
                        {field?.list?.map((item: any) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <div className="space-between flex">
                        <input
                          type="text"
                          onChange={(e) => {
                            setEditedField(field.id);
                            setTextField(e.target.value);
                          }}
                          value={
                            editedField == field.id ? textField : undefined
                          }
                          placeholder="Add an option"
                          className="flex-1"
                        />
                        <button
                          className="block bg-indigo-700 px-4 text-white hover:bg-indigo-900"
                          onClick={() => addFieldOption(field.id, textField)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="relative w-full p-5">
            <div className="absolute inset-x-0 bottom-0 flex h-12 justify-center">
              <button
                onClick={() => addQuestion()}
                className="inline-flex items-center rounded-md bg-gray-800 p-3 text-sm text-white hover:bg-gray-700"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-1/2">
        <div className="my-4 flex w-full flex-col space-y-2">
          <h1 className="text-2xl font-bold">Form Maker Preview</h1>
          <h2 className="text-lg">Untitled Form</h2>
        </div>
        <div className="my-10 rounded-md bg-white p-5 shadow-lg">
          {formContent.map((field) => {
            return (
              <div>
                <div className="flex items-center justify-between space-y-2">
                  <div
                    key={field.id}
                    className="block text-sm font-medium capitalize text-gray-700"
                  >
                    <label onClick={() => setOnEdit(true)}>
                      {field.question}
                    </label>
                  </div>
                </div>

                <div className="my-4">
                  {field.type == "multiple" && (
                    <div className="my-4 flex flex-col space-y-2">
                      <fieldset>
                        <label>최대 {field.maxSelect}개</label>
                        {field?.list?.map((item: any) => (
                          <div>
                            <input type="radio" key={item} value={item} />
                            <label>{item}</label>
                          </div>
                        ))}
                      </fieldset>
                    </div>
                  )}
                  {field.type == "short" && (
                    <input
                      type="text"
                      className="block h-10 w-full rounded-md px-5 shadow-sm"
                      placeholder={field.question}
                    />
                  )}
                  {field.type == "paragraph" && (
                    <textarea
                      rows={4}
                      className="block h-10 w-full rounded-md px-5 shadow-sm"
                      placeholder={field.question}
                    />
                  )}
                  {field.type == "dropdown" && (
                    <select className="block h-10 w-full rounded-md px-5 shadow-sm">
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
      </div>
    </div>
  );
}
