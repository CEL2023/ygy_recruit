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
import FormRegisterView from "../../../components/FormRegisterView";
import FormResultView from "../../../components/FormResultView";
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
    queryKey: ["club/canEnroll", data?.data[0]?.clubId],
    queryFn: () => canEnrollToClub(data?.data[0]?.clubId.toString()!),
  });
  const { data: form, isLoading: isFormLoading } = useQuery<
    any,
    AxiosError,
    { data: IForm }
  >({
    queryKey: ["club/form", data?.data[0]?.clubId, data?.data[0]?.formId],
    queryFn: () =>
      getClubFormById(
        data?.data[0]?.clubId.toString()!,
        data?.data[0]?.formId.toString()!
      ),
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
                <FormRegisterView
                  formId={data?.data[0]?.clubId!}
                  clubId={data?.data[0]?.formId!}
                  formAnswer={data?.data[0]?.data}
                  formContent={form?.data?.content}
                  title="Preview"
                  subTitle=""
                />
              ) : (
                <FormResultView
                  formAnswer={data?.data[0]?.data}
                  formContent={form?.data?.content}
                  title="Preview"
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
