import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDoubleDownIcon } from "@heroicons/react/solid";
import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import {
  getAllSubmittedEnroll,
  type IEnroll,
} from "../../../../../api/enroll/api";
import AdminEnrollCard from "../../../../../components/Enroll/AdminEnrollCard";
import AdminEnrollCardView from "../../../../../components/Enroll/AdminEnrollCardView";
import { useHide } from "../../../../../hooks/useHide";
import { sortKorean } from "../../../../../lib/sortKorean";
import { useHideStore } from "../../../../../zustand/HideStore";

function ViewPage() {
  const { hide: hided, setHide } = useHideStore();
  const [hide, setHideT] = useState<boolean>(false);
  useEffect(() => {
    setHideT(hided);
  }, [hided]);
  const [filtered, setFiltered] = useState<IEnroll[]>();
  const [query, setQuery] = useState<string>("");
  const {
    query: { clubId },
  } = useRouter();
  const { data, isLoading } = useQuery<any, AxiosError, { data: IEnroll[] }>({
    queryKey: [`club/admin/enrolls`, clubId],
    queryFn: () => getAllSubmittedEnroll(clubId!),
  });
  useEffect(() => {
    if (hide) {
      return setFiltered(
        data?.data.filter((i) => {
          return (i.passLevel > 0 && i.passLevel % 2 == 0) || i.passLevel == 7;
        })
      );
    }
    return setFiltered(data?.data);
  }, [data, hide]);
  const filterName = filtered?.filter((p) => {
    return p.User.name
      .replace(" ", "")
      .toLocaleLowerCase()
      .toLocaleLowerCase()
      .includes(query?.toLocaleLowerCase().replace(" ", ""));
  });
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className=" my-8">
          <div className=" text-center text-5xl font-bold">지원자보기</div>
          <div className="md:1/3 relative mx-auto my-4 w-2/3">
            <input
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 py-3 pl-10 pr-3 leading-5 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M21 21L15.5 15.5M8 15.5C11.0376 15.5 13.5 13.0376 13.5 10C13.5 6.96243 11.0376 4.5 8 4.5C4.96243 4.5 2.5 6.96243 2.5 10C2.5 13.0376 4.96243 15.5 8 15.5Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="my-4 mx-auto w-full md:w-96"></div>
          <div className=" mx-5 flex  items-center justify-end gap-2 text-2xl">
            <label htmlFor="hide">탈락자 숨기기</label>
            <input
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              id="hide"
              type={"checkbox"}
              checked={hide}
              onChange={(e) => {
                setHide(e.target.checked);
              }}
            />
          </div>

          <div>
            {[1, 2, 3].map((_, idx) => {
              return (
                <div className=" border-b border-[#7ca6de] py-4">
                  <div className=" mx-2 text-3xl font-semibold">
                    {(idx + 1).toString()} 지망 (
                    {filterName
                      ?.filter((o) => o.priority == idx + 1)
                      .length.toString()}
                    )
                  </div>
                  <div className=" mx-auto grid w-full grid-cols-2 gap-2 md:mx-2 md:grid-cols-3 lg:grid-cols-5">
                    {filterName
                      ?.filter((o) => o.priority == idx + 1)
                      ?.sort((a, b) => {
                        return a.User.name > b.User.name
                          ? 1
                          : a.User.name < b.User.name
                          ? -1
                          : 0;
                      })
                      ?.map((i) => {
                        return (
                          <AdminEnrollCardView
                            clubId={i?.clubId?.toString()}
                            enroll={i}
                            key={i.id}
                          />
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewPage;
