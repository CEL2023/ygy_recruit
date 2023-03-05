import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { getClub, type IClub } from "../../../api/club";
import ClubHeart from "../../../components/Club/ClubHeart";
import VertProfileCard from "../../../components/VertProfileCard";
import { useGlobalModal } from "../../../zustand/GlobalModalStore";
import { useUserStore } from "../../../zustand/User";

function Page() {
  const {
    query: { clubId },
    push,
  } = useRouter();
  const { user } = useUserStore();
  const { data, isLoading } = useQuery<any, AxiosError, { data: IClub }>({
    queryKey: [`club`, clubId],
    queryFn: () => getClub(parseInt(clubId! as string)),
  });
  const { setGMOpen } = useGlobalModal();
  const checkIsAdmin = () => {
    if (!user?.isManageAdmin && !!user?.rank) {
      setGMOpen(true, {
        title: "알림",
        content: "관리자는 지원할 수 없습니다 관리자페이지를 이용해주세요",
      });
      return true;
    }
    return false;
  };
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className=" mx-auto w-full sm:w-5/6">
          <div className=" relative h-64">
            <Image
              className=" object-cover"
              fill
              src={
                data?.data?.bgImg == "" || data?.data?.bgImg == undefined
                  ? "/ferris.jpg"
                  : data?.data?.bgImg
              }
              alt=""
            />
            <div className="dark:bg-opacity-85 absolute left-1 bottom-0 rounded-t-2xl bg-white p-4 py-2 text-2xl font-bold text-black dark:bg-[#212121] dark:text-white">
              {data?.data?.name}
            </div>
            <ClubHeart
              disabled={data?.data?.clubLikes ? false : true}
              clubId={(clubId as string) ?? ""}
              isLiked={data?.data?.clubLikes?.length == 1 ? true : false}
            />
          </div>
          <div>
            <div className="flex flex-col gap-2 md:flex-row">
              <div className=" basis-3/4 rounded-2xl sm:shadow-xl">
                <div className=" break-all p-4 text-center text-xl font-semibold sm:text-left sm:text-2xl">
                  {data?.data?.desc}
                </div>
              </div>
              <div className=" basis-1/4 flex-col items-center rounded-2xl sm:flex-row sm:p-4 sm:shadow-xl">
                <div className="text-center text-2xl font-semibold">부원</div>
                <div>
                  {data?.data?.members
                    ?.sort((a, b) => b.rank - a.rank)
                    .map((item, index: number) => {
                      return <VertProfileCard key={index} user={item} />;
                    })}
                </div>
                <div className=" mx-2 flex gap-4 sm:flex-col">
                  {user?.isManageAdmin ||
                  (user?.rank && user?.rank >= 1 && user?.clubId == clubId) ? (
                    <button
                      onClick={() => push(`/club/${clubId}/admin`)}
                      className="mx-auto w-48 rounded-xl bg-green-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-green-400"
                    >
                      관리자페이지
                    </button>
                  ) : !user ? null : (
                    <button
                      onClick={() => {
                        const isAMI = checkIsAdmin();
                        if (isAMI) return;
                        push(`/club/${clubId}/form`);
                      }}
                      className="mx-auto w-48 rounded-xl bg-indigo-600 px-4 py-2 text-xl font-medium text-white transition-all duration-200 hover:bg-indigo-400"
                    >
                      지원하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
