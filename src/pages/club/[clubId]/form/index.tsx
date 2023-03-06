import { QueryClient, useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  canEnrollToClub,
  getClubForm,
  ICanEnroll,
  type IForm,
} from "../../../../api/form/api";
import FormRegisterView from "../../../../components/FormViews/FormRegisterView";
import { IField } from "../admin/form/create";
const queryClient = new QueryClient();
function Page() {
  useEffect(() => {
    queryClient.invalidateQueries(["club/canEnroll"]);
  }, []);
  const [waiting, setWaiting] = useState(true);
  const {
    query: { clubId },
    push,
  } = useRouter();
  const { data: canEnroll, isLoading: isLoadingEnrollStatus } = useQuery<
    any,
    AxiosError,
    { data: ICanEnroll }
  >({
    queryKey: ["club/canEnroll", clubId],
    queryFn: () => canEnrollToClub(clubId!),
  });
  useEffect(() => {
    if (!canEnroll?.data) {
      return setWaiting(true);
    }
    if (!canEnroll?.data.ok) {
      push(`/me/enroll/${canEnroll?.data.enrollId}`);
      return;
    }
    setWaiting(false);
  }, [canEnroll?.data]);
  const { data, isLoading, isRefetching, isFetching } = useQuery<
    any,
    AxiosError,
    { data: IForm }
  >({
    queryKey: [`club/form`, clubId],
    queryFn: () => getClubForm(clubId!),
    enabled: canEnroll?.data.ok && !waiting,
  });

  return (
    <div>
      {isLoadingEnrollStatus ||
      isLoading ||
      waiting ||
      isFetching ||
      isRefetching ? (
        <div>Loading...</div>
      ) : (
        <FormRegisterView
          formId={data?.data?.id!}
          clubId={data?.data?.clubId!}
          formContent={!(data == null || undefined) ? data?.data?.content : []}
          title="지원하기"
          subTitle=""
        />
      )}
    </div>
  );
}

export default Page;
