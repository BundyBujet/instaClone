import ProfileForm from "@/components/forms/ProfileForm";
import { useUserContext } from "@/context/AuthContext";
import React from "react";
import { useParams } from "react-router-dom";
import { Profile } from ".";

const UpdateProfile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  return (
    <div className="flex flex-1">
      <div className="common-container ">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/edit.svg"
            alt="add post"
            width={36}
            height={36}
            className="contain-cover"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit profile</h2>
        </div>
        <ProfileForm action="Update" />
      </div>
    </div>
  );
};

export default UpdateProfile;
