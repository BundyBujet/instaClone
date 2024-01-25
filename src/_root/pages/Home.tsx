import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import {
  useGetPosts,
  useGetRecentPost,
} from "@/lib/react-query/queriesAndMutations";

import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView } = useInView();

  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetPosts();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (!posts) {
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
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.pages.map((item, index) => (
                <Fragment key={`page-${index}`}>
                  {item?.documents.map((post) => (
                    <PostCard post={post} key={post.$id} />
                  ))}
                </Fragment>
              ))}
            </ul>
          )}
          {!isPostLoading && (
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

export default Home;
