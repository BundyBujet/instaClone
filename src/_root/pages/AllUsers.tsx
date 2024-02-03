import Loader from "@/components/shared/Loader";
import User from "@/components/shared/User";
import { userGetAllUsers } from "@/lib/react-query/queriesAndMutations";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AllUsers = () => {
  const { ref, inView } = useInView();

  const {
    data: users,
    isPending: isUsersLoading,
    isError: isErrorPosts,
    fetchNextPage,
    hasNextPage,
  } = userGetAllUsers();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (!users) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Users</h2>
          {isUsersLoading && !users ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {users?.pages.map((item, index) => (
                <Fragment key={`page-${index}`}>
                  {item?.documents.map((user) => (
                    <User user={user} key={user.$id} />
                  ))}
                </Fragment>
              ))}
            </ul>
          )}
          {hasNextPage && (
            <div ref={ref} className="mt-10">
              <Loader />
            </div>
          )}
          {!hasNextPage && (
            <p className="text-light-4 mt-10 text-center w-full">
              End of Posts
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
