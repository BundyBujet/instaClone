const Profile = () => {
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
      </div>
    </div>
  );
};

export default Profile;
