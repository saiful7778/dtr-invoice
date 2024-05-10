import useAuth from "@/hooks/useAuth";
import { Avatar } from "keep-react";

export const metadata = {
  title: "Profile - DTR-Invoice",
  description: "This is profile page of DTR-Invoice",
};

const Profile = async () => {
  const { user } = await useAuth();
  return (
    <div className="flex items-center gap-4">
      <Avatar size="2xl" img={user?.image} />
      <div>
        <div className="text-xl font-bold">{user?.name}</div>
        <div className="-mt-1 text-sm leading-3 text-gray-500">
          {user?.email}
        </div>
        <div className="mt-1">
          <span className="font-bold">Role : </span>
          <span>{user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
