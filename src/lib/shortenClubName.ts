export const shortenClubName = (name: string) => {
  switch (name) {
    case "과학기술정보통신부":
      return "과기부";
    case "창의융합과학부":
      return "창융부";
    case "기계공학부":
      return "기공부";
    case "지구과학부":
      return "지학부";
    default:
      return name;
  }
};
