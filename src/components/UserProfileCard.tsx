import Image from "next/image";
import Link from "next/link";
import { type IFetchMe } from "../api/auth/fetchMe";
import NotSignedInBase from "./notSignedInBase";

function ProfileCard({ user }: { user: IFetchMe | null }) {
  return (
    <>
      {user ? (
        <Link
          href={"/me"}
          className="focus:shadow-outline h-10 items-center justify-center break-words rounded py-1 text-base font-bold hover:text-indigo-400 focus:outline-none"
        >
          <div className="flex items-center justify-center gap-2">
            <Image
              src={
                user.profImg == "" || !user.profImg
                  ? "/ferris.jpg"
                  : user.profImg
              }
              width={30}
              height={30}
              alt=""
            />
          </div>
        </Link>
      ) : (
        <NotSignedInBase />
      )}
    </>
  );
}

export default ProfileCard;
