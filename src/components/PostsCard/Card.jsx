import { useEffect, useInsertionEffect, useState } from "react";
import PostService from "../../services/PostService";
import FollowersService from "../../services/FollowersService";
import THARRAK from "../../services/AddTharrakService";
import styles from "../../styles/PostCard.module.css";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  //use hooks
  const navigate = useNavigate();
  //
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFollowing, setisFollowing] = useState(false);
  console.log("posts", posts);
  //

  const GET_Tharrak = async (postId) => {
    try {
      const res = await THARRAK.GeTTharrak(postId);
      console.log("res", res);
    } catch (err) {
      setError(err.message || "Failed to add Tharrak to the post");
      setLoading(false);
    }
  };
  //
  const AddTharrak = async (postId) => {
    const U = localStorage.getItem("id");
    try {
      const res = await THARRAK.addTharrak(U, postId);
      //

      console.log(res.already);
      if (res.already != "Already liked" && res.id.length > 5) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, tharrak_count: Number(post.tharrak_count) + 1 }
              : post
          )
        );
      }
    } catch (err) {
      setError(err.message || "Failed to add Tharrak to the post");
      setLoading(false);
    }
  };
  //
  const FOLLOW = async (userid) => {
    console.log(userid);
    const U = localStorage.getItem("id");
    try {
      const res = await FollowersService.followUser(U, userid);
      console.log(res.message);
      if (res.message == "Followed successfully") {
        setisFollowing(true);
      }
    } catch (err) {
      setError(err.message || "Failed to Follow");
      setLoading(false);
    }
  };

  const UNFOLLOW = async (userid) => {
    console.log(userid);
    const U = localStorage.getItem("id");
    try {
      const res = await FollowersService.unfollowUser(U, userid);
      console.log(res.message);
      if (res.message == "Unfollowed successfully") {
        setisFollowing(false);
      }
    } catch (err) {
      setError(err.message || "Failed to Follow");
      setLoading(false);
    }
  };

  //
  useEffect(() => {
    //
    const U = localStorage.getItem("id");
    const GET_ALL = async () => {
      try {
        const res = await FollowersService.getFollowers(U);

        console.log(res.message, "AND", res);
      } catch (err) {
        setError(err.message || "Failed to Follow");
        setLoading(false);
      }
    };
    GET_ALL();
    //
    const fetchPosts = async () => {
      try {
        const data = await PostService.getAllPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.postContainer}>
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.map((post) => (
        <div key={post.id} className={styles.postCard}>
          {/* User Info */}
          <div className={styles.cardHeader}>
            <img
              src={
                post.profile_picture ||
                "https://cdn-icons-png.flaticon.com/128/64/64572.png"
              }
              alt="User Avatar"
              className={styles.userAvatar}
            />
            <strong>{post.username}</strong>
            <button
              className={styles.followButton}
              onClick={
                isFollowing
                  ? () => UNFOLLOW(post.user_id)
                  : () => FOLLOW(post.user_id)
              }
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
          {/* Post Image */}
          <div className={styles.image_url}> </div>

          <img
            src={post.image_url}
            alt={post.caption}
            className={styles.postImage}
          />
          <h5 style={{ marginLeft: "10px" }}>{post.caption}</h5>
          {/* Actions */}
          <div className={styles.actions}>
            <button
              className={styles.likeButton}
              onClick={() => AddTharrak(post.id)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/4233/4233474.png"
                alt=""
              />{" "}
              {post.tharrak_count}
            </button>
            <button
              className={styles.commentButton}
              onClick={() => navigate(`/comments/${post.id}/${post.username}`)}
            >
              <img
                //
                src="https://cdn-icons-png.flaticon.com/128/9730/9730019.png"
                alt=""
              />{" "}
              {post.comment_count}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
