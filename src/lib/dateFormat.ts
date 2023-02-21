export const toDateString = (date: string) => {
  return new Intl.DateTimeFormat("ko", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(date));
};
