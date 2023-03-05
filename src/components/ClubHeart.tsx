import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { changeLike } from "../api/club";
import { HeartIcon as HeartOutline } from "@heroicons/react/outline";
interface props {
  isLiked: boolean;
  clubId: string;
  disabled: boolean;
}
function ClubHeart({ isLiked, clubId, disabled }: props) {
  const [likes, setLikes] = useState(isLiked);
  const { mutateAsync } = useMutation({
    mutationFn: () => changeLike(isLiked, clubId),
    mutationKey: [`club/likes`, clubId],
  });
  return (
    <button
      disabled={disabled}
      onClick={async () => {
        setLikes((prev) => !prev);
        await mutateAsync();
      }}
      className="  absolute bottom-4 right-4  rounded-3xl bg-red-300 bg-opacity-30 p-2"
    >
      {likes ? (
        <HeartOutline className="h-8 w-8 fill-current text-red-500 outline-1" />
      ) : (
        <HeartOutline className="h-8 w-8 text-red-500 outline-1 hover:fill-current" />
      )}
    </button>
  );
}

export default ClubHeart;
