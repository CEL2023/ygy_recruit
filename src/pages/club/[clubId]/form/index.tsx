import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { getClubForm, type IForm } from "../../../../api/form/api";
import FormRegisterView from "../../../../components/FormRegisterView";

function Page() {
  const {
    query: { clubId },
  } = useRouter();
  const { data, isLoading } = useQuery<any, AxiosError, { data: IForm }>({
    queryKey: [`club/form`, clubId],
    queryFn: () => getClubForm(clubId!),
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <FormRegisterView
          formId={data?.data?.id!}
          clubId={data?.data?.clubId!}
          formContent={data?.data?.content ?? []}
          title="지원하기"
          subTitle=""
        />
      )}
    </div>
  );
}

export default Page;
