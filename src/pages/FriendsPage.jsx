import { useState, useEffect } from "react";
import FollowersService from "../services/FollowersService";
import styles from "../styles/Friends.module.css";

const FriendsPage = () => {
  const [Foller, setFoller] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingFollow, setloadingFollow] = useState(false);
  console.log(Foller);

  //
  const UNFOLLOW = async (userid) => {
    setloadingFollow(true);
    console.log(userid);
    const U = localStorage.getItem("id");
    try {
      const res = await FollowersService.unfollowUser(U, userid);
      console.log(res.message);

      setFoller((prevFollowers) =>
        prevFollowers.filter((follower) => follower.id != userid)
      );

      setisFollowing(false);
      setloadingFollow(false);

      if (res.message === "Unfollowed successfully") {
      }
    } catch (err) {
      setloadingFollow(false);
    }
  };
  //

  useEffect(() => {
    //
    const U = localStorage.getItem("id");
    const GET_ALL = async () => {
      setloading(true);
      try {
        const res = await FollowersService.getFollowers(U);
        setFoller(res.followers);
        setloading(false);
      } catch (err) {
        console.error("err", err);
        setloading(false);
      }
    };
    GET_ALL();
    //
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.Child}>
        <h4>Trending</h4>
        {loading && <span style={{ color: "#000" }}>Loading...</span>}
        {Foller.map((follower) => (
          <div key={follower.id} className={styles.FollerListCard}>
            <div className={styles.left}>
              <img
                src={follower.profile_picture}
                alt={follower.username}
                width="50"
                className={styles.profile_picture}
              />
              <span className={styles.username}>{follower.username}</span>
            </div>
            <button
              onClick={() => UNFOLLOW(follower.id)}
              className={styles.UNFOLLOW}
            >
              {loadingFollow ? "Unfollowing.." : "UNFOLLOW"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
