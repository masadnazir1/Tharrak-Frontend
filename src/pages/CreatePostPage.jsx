import { useState, useRef } from "react";
import PostService from "../services/PostService";
import styles from "../styles/CreatePostPage.module.css";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  //
  const navigate = useNavigate();
  //
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  console.log(fileInputRef.current);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select the picture!");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const user_id = "c0a6ca00-7c51-4743-a12e-09b0dd6e567d"; // Example user ID

      const data = await PostService.uploadPost(user_id, caption, image);
      console.log("Post Uploaded:", data);

      alert("Post uploaded successfully!");
      setCaption("");
      setImage(null);
      setPreview(null);
      navigate("/");
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <button onClick={() => navigate(-1)} className={styles.back}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/271/271220.png"
            alt="Back"
          />
        </button>
        <h2>Create a New Post</h2>
        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className={styles.uploadBtnhead}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <section className={styles.BoxForm}>
        {/* Image Upload Box */}
        <div
          className={styles.uploadBox}
          onClick={() => fileInputRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className={styles.previewImage} />
          ) : (
            <div className={styles.uploadIcon}>
              <span>+</span>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className={styles.hiddenFileInput}
          onChange={handleImageChange}
        />

        {/* Caption Input */}
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Enter caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className={styles.input}
          />
        </div>
      </section>
      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={styles.uploadBtn}
      >
        {loading ? "Uploading..." : "Upload Post"}
      </button>

      {/* Error Message */}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default CreatePostPage;
