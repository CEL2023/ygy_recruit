import { useMutation, useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { getClubSubmittedEnroll } from "../../../../../api/enroll/api";
import { getClubFormById, IForm } from "../../../../../api/form/api";
import FormResultView from "../../../../../components/FormViews/FormResultView";

function EnrollDetail() {
  const {
    query: { clubId, enrollId },
  } = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: [`club/enroll`, clubId, enrollId],
    queryFn: () => getClubSubmittedEnroll(clubId!, enrollId!),
  });

  const {
    data: form,
    isLoading: isFormLoading,
    isFetched: isFormFetched,
  } = useQuery<any, AxiosError, { data: IForm }>({
    queryKey: ["club/admin/form"],
    queryFn: () => getClubFormById(clubId!, data?.data![0]?.formId.toString()!),
    enabled: !!data,
  });
  return (
    <div>
      {!isLoading && isFormFetched && !isFormLoading ? (
        <div>
          <FormResultView
            title={"asdasd"}
            subTitle={data?.data[0]?.User.name!}
            formContent={form?.data?.content ?? "[]"}
            formAnswer={data?.data[0]?.data}
          />
        </div>
      ) : (
        <div>asd</div>
      )}
    </div>
  );
}

export default EnrollDetail;
