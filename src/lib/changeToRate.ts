export const toRateStr = ({
  enrolls,
  limit,
}: {
  enrolls: number;
  limit: number;
}) => {
  return Math.round((enrolls / limit) * 100) / 100;
};
