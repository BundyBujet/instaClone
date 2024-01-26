import GridSavedPostList from "@/components/shared/GridSavedPostList";
import Loader from "@/components/shared/Loader";
import { useGetSavedPosts } from "@/lib/react-query/queriesAndMutations";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Saved = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetSavedPosts();

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
  console.log(posts);

  return (
    <div className="explore-container">
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Saved Post</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer   ">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {posts &&
          posts.pages.map((item, index) => (
            <GridSavedPostList key={`page-${index}`} posts={item.documents} />
          ))}
      </div>
      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}

      {!posts?.pages[0]?.documents.length && (
        <p className="text-light-4 mt-10 text-center w-full">No Saved Posts</p>
      )}
    </div>
  );
};

export default Saved;
