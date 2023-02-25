export const toDateString = (date: string | Date) => {
  return new Intl.DateTimeFormat("ko", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(date));
};
