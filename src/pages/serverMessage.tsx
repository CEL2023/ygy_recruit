import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { sendServerMessage } from "../api/club";
import { fetcher } from "../api/fetcher";
import { getByte } from "../lib/countByte";

function serverMessage() {
  const [bytes, setBytes] = useState<number>(0);
  const [inputD, setinputD] = useState<string>("");
  const { isLoading: isLoadingMessage, mutateAsync: messageMutate } =
    useMutation({
      mutationFn: () => sendServerMessage(inputD),
      mutationKey: ["server/message", bytes, inputD.length],
    });
  return (
    <>
      <div className="my-2 mx-2 cursor-pointer items-center rounded-xl bg-gray-500 bg-opacity-10 py-3 px-4 text-xl font-normal  md:mx-0 md:py-4 md:px-8">
        <div>문자발송</div>
        <div className=" flex items-center justify-between">
          <ReactTextareaAutosize
            className="block h-10  rounded-md border px-5 py-2 text-black shadow-sm dark:bg-white"
            value={inputD}
            onChange={(e) => {
              setinputD(e.target.value);
              setBytes(inputD.length == 0 ? 0 : getByte(inputD));
            }}
            onBlur={() => setBytes(inputD.length == 0 ? 0 : getByte(inputD))}
          />
        </div>
        <div>
          <div className={bytes > 120 ? "text-red-500" : ""}>
            {bytes}/120바이트
          </div>
          <div className="flex justify-end">
            <button
              onClick={async () => await messageMutate()}
              disabled={isLoadingMessage}
              className="w-48 rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
            >
              {!isLoadingMessage ? "발송하기" : "loading..."}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onDoubleClick={async () => {
            await fetcher.post("/api/v1/club/10/admin/applyAll");
            await fetcher.post("/api/v1/club/11/admin/applyAll");
            await fetcher.post("/api/v1/club/12/admin/applyAll");
            await fetcher.post("/api/v1/club/13/admin/applyAll");
            await fetcher.post("/api/v1/club/14/admin/applyAll");
            await fetcher.post("/api/v1/club/15/admin/applyAll");
            await fetcher.post("/api/v1/club/16/admin/applyAll");
            await fetcher.post("/api/v1/club/17/admin/applyAll");
            await fetcher.post("/api/v1/club/18/admin/applyAll");
          }}
          className="w-48 rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
        >
          applyAll
        </button>
      </div>
    </>
  );
}
export default serverMessage;
