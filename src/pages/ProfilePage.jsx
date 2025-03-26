import { useState, useEffect } from "react";
import styles from "../styles/Profile.module.css";
import USER_SERVICE from "../services/UserDetailsService";
import ByUserId from "../components/PostsCard/PostsByUser";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState("");
  const [id, setid] = useState(localStorage.getItem("id"));
  console.log(User.id);

  useEffect(() => {
    const GET_USER = async () => {
      try {
        const res = await USER_SERVICE.GETUSER(id);
        console.log("res", res);
        setUser(res);
      } catch (err) {
        console.error("Error fecthing the user details", err);
      }
    };
    GET_USER();
  }, [id]);

  return (
    <div className={styles.Container}>
      <div className={styles.Child}>
        <section className={styles.ProfileBox}>
          <div className={styles.PictureBox}>
            <img
              src={
                User
                  ? User.profile_picture
                  : "https://cdn-icons-png.flaticon.com/128/847/847969.png"
              }
              alt={User.username}
              className={styles.profile_picture}
            />
            <div className={styles.NameandFollowers}>
              <h2 className={styles.username}>
                {User ? User.username : "Loading.."}
              </h2>
              <div className={styles.Followers}>
                <span> 3K Followers</span>
                <span> 3.6K Followings</span>
              </div>
            </div>
          </div>
          <div className={styles.details}>
            <button
              className={styles.Dashboardbtn}
              onClick={() => navigate("/Dashboard")}
            >
              Dashboard
            </button>
          </div>
        </section>
        <section className={styles.PostsSection}>
          <ByUserId UserId={id} />
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
