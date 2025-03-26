import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/CommentsPage.module.css";
import commentsService from "../services/CommentsService";
import axios from "axios";
const CommentsPage = () => {
  const navigate = useNavigate();
  const { postId, username } = useParams();
  const [isSending, setisSending] = useState(false);
  const [Comments, setComments] = useState([]);
  const [comment_text, setcomment_text] = useState("Hello");

  console.log(Comments);

  const UserId = localStorage.getItem("id");

  const postComment = async () => {
    try {
      const res = await commentsService.postComment(
        UserId,
        postId,
        comment_text
      );
      console.log(res);
    } catch (err) {
      console.error("Error Posting the Comments", err);
    }
  };
  //
  //
  useEffect(() => {
    const GetComments = async () => {
      // postId;

      try {
        const res = await commentsService.getComments(postId);
        console.log(res);
        setComments(res);
      } catch (err) {
        console.error("Error getting the Comments", err);
      }

      console.log(postId, username);
    };
    GetComments();
  }, []);
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <div className={styles.left}>
          <img
            onClick={() => navigate(-1)}
            src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
            alt=""
          />
        </div>
        <div className={styles.right}>{username}'s Post</div>
      </div>
      <div className={styles.Child}>
        {Comments.map((comment) => (
          <div key={comment.id}>{comment.comment_text}</div>
        ))}

        <div className={styles.Footer}>
          <input
            type="text"
            placeholder={`Comment as a ${username}....`}
            value={comment_text}
            onChange={(e) => setcomment_text(e.target.value)}
          />
          <button onClick={postComment}>
            <img
              src={
                isSending
                  ? "https://cdn-icons-png.flaticon.com/128/7794/7794282.png"
                  : "https://cdn-icons-png.flaticon.com/128/10426/10426419.png"
              }
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
