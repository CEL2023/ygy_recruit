import Image from "next/image";
import Link from "next/link";
import { type IClub } from "../../api/club";

function ClubCard({ club }: { club: IClub }) {
  return (
    <Link href={`/club/${club.id}`} key={club.name}>
      <div className=" clubs-center group w-full flex-col justify-between overflow-hidden rounded-lg bg-[#7ca6de] text-xl text-white shadow dark:bg-slate-600 md:w-96">
        <div className="clubs-center relative flex h-48 w-full justify-center object-cover transition-transform duration-300 ease-in-out group-hover:scale-105">
          <Image
            alt=""
            src={club?.bgImg == "" ? "/ferris.jpg" : club.bgImg}
            fill
            sizes=""
            className="object-cover"
          />
        </div>
        <div className="px-4 py-2">
          <div className="flex justify-between gap-2 py-1 px-1 text-center text-sm">
            <div>
              <span className="font-bold">{club.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ClubCard;
