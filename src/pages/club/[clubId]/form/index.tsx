import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { getClubForm } from "../../../../api/form";
import FormPreview from "../../../../components/FormPreview";
import FormRegisterView from "../../../../components/FormRegisterView";
import FormResultView from "../../../../components/FormResultView";

function index() {
  const {
    query: { clubId },
  } = useRouter();
  const { data, isLoading } = useQuery<any, AxiosError, { data: any }>({
    queryKey: [`/club/${clubId}/form/0`],
    queryFn: () => getClubForm(clubId!),
  });
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <FormRegisterView
          formContent={data?.data.content ?? []}
          title="지원하기"
          subTitle=""
        />
      )}
    </div>
  );
}

export default index;
