import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import { getClubFormById, type IForm } from "../../../../../api/form/api";
import FormEditablePreview from "../../../../../components/FormViews/FormEditablePreview";
import BasicLoader from "../../../../../components/Global/Loaders/BasicLoader";
export default function Page() {
  const {
    query: { clubId, formId },
  } = useRouter();
  const { data, isLoading } = useQuery<any, AxiosError, { data: IForm }>({
    queryKey: ["club/admin/form", formId],
    queryFn: () => getClubFormById(clubId!, formId!),
  });
  return (
    <div>
      {isLoading ? (
        <BasicLoader />
      ) : (
        <FormEditablePreview
          clubId={clubId! as string}
          formId={formId! as string}
          formContent={data?.data?.content}
          title="양식 미리보기"
          subTitle="수정/삭제 가능"
        />
      )}
    </div>
  );
}
