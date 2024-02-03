import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { Separator } from "@/components/ui/separator";

import { Link, useParams } from "react-router-dom";
import PostCard from "@/components/shared/PostCard";
import GridPostList from "@/components/shared/GridPostList";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: userProfile } = useGetUserById(id);

  return (
    <div className="flex flex-1">
      {userProfile && (
        <div className="common-container ">
          <div className="flex  flex-col lg:flex-row justify-start items-center gap-2 lg:gap-4 w-full">
            <img
              src={userProfile.imageUrl || "/assets/images/profile.png"}
              alt="profile picture"
              width={90}
              height={90}
              className="object-cover h-28 w-28 rounded-full"
            />
            <div className="flex flex-col items-center lg:items-start ">
              <p className="h3-bold md:h2-bold lg:text-left w-full text-center ">
                {userProfile.name}
              </p>
              <p className="small-regular text-light-3">
                @{userProfile.username}
              </p>
              <p className="mt-6 small-regular md:font-medium">
                {userProfile.bio}
              </p>
            </div>
            {user.id === id ? (
              <Link to={`/update-profile/${user.id}`}>
                <Button className="shad-button_dark_4">Edit Profile</Button>
              </Link>
            ) : (
              ""
            )}
          </div>
          <Separator className="bg-light-3 w-full lg:w-9/12" />
          <div className="flex flex-wrap gap-9 w-full max-w-5xl">
            <GridPostList posts={userProfile.posts} showUser={false} />
          </div>
        </div>
      )}
      {!userProfile && <Loader />}
    </div>
  );
};

export default Profile;
