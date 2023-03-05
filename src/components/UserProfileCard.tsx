import Image from "next/image";
import Link from "next/link";
import { type IFetchMe } from "../api/auth/fetchMe";
import NotSignedInBase from "./notSignedInBase";
import { UserIcon } from "@heroicons/react/solid";
import ProfilePopUp from "./ProfilePopUp";
function ProfileCard({ user }: { user: IFetchMe | null }) {
  return <>{user ? <ProfilePopUp name={user.name} /> : <NotSignedInBase />}</>;
}

export default ProfileCard;
