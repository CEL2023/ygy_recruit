import { XIcon } from "@heroicons/react/solid";
import React from "react";
interface QTitleProps {
  id: number;
  onTypeChange: ({ id, Qtype }: { id: number; Qtype: string }) => void;
  deleteQuestion: ({ id }: { id: number }) => void;
}

function QCreateTools({ id, onTypeChange, deleteQuestion }: QTitleProps) {
  return (
    <div className=" flex gap-2">
      <select
        className="dark block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange={(e) =>
          onTypeChange({
            id,
            Qtype: e.target.value || "",
          })
        }
      >
        <option value="short">단답형</option>
        <option value="paragraph">서술형</option>
        <option value="dropdown">드롭다운</option>
        <option value="multiple">복수선택</option>
      </select>
      <button
        className="block rounded-2xl  "
        onClick={() => deleteQuestion({ id })}
      >
        <XIcon className="h-6 w-6 text-red-500 hover:text-red-900" />
      </button>
    </div>
  );
}

export default QCreateTools;
