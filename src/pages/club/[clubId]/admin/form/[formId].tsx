import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import { getClubFormById, type IForm } from "../../../../../api/form/api";
import FormPreview from "../../../../../components/FormPreview";
export default function Page() {
  const {
    query: { clubId, formId },
  } = useRouter();
  const { data, isLoading } = useQuery<any, AxiosError, { data: IForm }>({
    queryKey: ["club/admin/form", formId],
    queryFn: () => getClubFormById(formId!, clubId!),
  });
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <FormPreview
          formContent={data?.data?.content}
          title="Preview"
          subTitle=""
        />
      )}
    </div>
  );
}
