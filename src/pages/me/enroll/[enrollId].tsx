import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import { getMyEnroll, IEnroll } from "../../../api/enroll/api";
import {
  canEnrollToClub,
  getClubFormById,
  ICanEnroll,
  IForm,
} from "../../../api/form/api";
import FormDraftView from "../../../components/FormViews/FormDraftView";
import FormRegisterView from "../../../components/FormViews/FormRegisterView";
import FormResultView from "../../../components/FormViews/FormResultView";
import { IField } from "../../club/[clubId]/admin/form/create";
export default function Page() {
  const {
    query: { enrollId },
  } = useRouter();
  const { data, isLoading } = useQuery<any, AxiosError, { data: IEnroll[] }>({
    queryKey: [`me/enroll`, enrollId],
    queryFn: () => getMyEnroll(enrollId!),
  });
  const { data: canEnroll, isLoading: isLoadingEnrollStatus } = useQuery<
    any,
    AxiosError,
    { data: ICanEnroll }
  >({
    queryKey: ["club/canEnroll", enrollId],
    queryFn: () => canEnrollToClub(data?.data[0]?.clubId.toString()!),
    enabled: !!data,
  });
  const { data: form, isLoading: isFormLoading } = useQuery<
    any,
    AxiosError,
    { data: IForm }
  >({
    queryKey: ["club/form/enroll", enrollId],
    queryFn: () =>
      getClubFormById(
        data?.data[0]?.clubId.toString()!,
        data?.data[0]?.formId.toString()!
      ),
    enabled: !!data,
  });
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          {isFormLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {canEnroll?.data?.hasDraft ? (
                <FormDraftView
                  enrollId={enrollId as string}
                  formId={data?.data[0]?.clubId!}
                  clubId={data?.data[0]?.formId!}
                  formAnswer={data?.data[0]?.data}
                  formContent={form?.data?.content as IField[]}
                  title="지원서 수정하기"
                  subTitle=""
                />
              ) : (
                <FormResultView
                  formAnswer={data?.data[0]?.data}
                  formContent={form?.data?.content}
                  title="나의 지원서"
                  subTitle=""
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
