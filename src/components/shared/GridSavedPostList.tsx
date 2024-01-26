import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStates?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStates = true,
}: GridPostListProps) => {
  const { user } = useUserContext();
  return (
    <ul className="grid-container ">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.post.$id}`} className="grid-post_link">
            <img
              src={post?.post?.imageUrl ?? "https://placehold.co/400"}
              alt="post image"
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post?.post?.creator?.imageUrl ?? "https://placehold.co/400"
                  }
                  alt="creator image"
                  className="h-8 w-8 rounded-full"
                />
                <p className="line-clamp-1">{post?.post?.creator?.name}</p>
              </div>
            )}

            {showStates && <PostStats post={post.post} userId={user?.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
