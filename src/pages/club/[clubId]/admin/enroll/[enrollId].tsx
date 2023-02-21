import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { getClubSubmittedEnroll } from "../../../../../api/enroll";
import FormPreview from "../../../../../components/FormPreview";
import { clubIdToStr } from "../../../../../lib/clubIdToStr";

async function enrollDetail() {
  const {
    query: { clubId, enrollId },
  } = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: [`/club/${clubId}/enroll/${enrollId}`],
    queryFn: () => getClubSubmittedEnroll(clubId!, enrollId!),
  });
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          <FormPreview
            title={(await clubIdToStr(clubId!))!}
            subTitle={data?.data[0]?.User.name!}
            formContent={[]}
          />
        </div>
      )}
    </div>
  );
}

export default enrollDetail;
