import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Link to={`/profile/${user?.$id}`}>
          <img
            src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="creator"
            className="rounded-full w-12 h-12 object-cover"
          />
        </Link>
        <div className="flex flex-col ">
          <p className="base-medium lg:body-bold text-light-1">{user?.name}</p>
          <span className="subtle-semibold lg:small-regular text-light-3 ">
            @{user?.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default User;
