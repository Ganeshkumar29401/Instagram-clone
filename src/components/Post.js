import styles from "./Post.module.css";
import { Avatar } from "@mui/material";

const Post = ({username,caption,imgUrl}) => {
  return (
    <div className={styles.post}>
    <div className={styles.post_header}>
      <Avatar
        src="/static/images/avatar/1.jpg"
        alt="username"
        className={styles.post_avatar}
      />
      <h3>{username}</h3>
    </div>
      <img
        src={imgUrl}
        alt="post_image"
        className={styles.post_img}
      />
      <h4 className={styles.post_text}>
        <strong>Caption: </strong>{caption}
      </h4>
    </div>
  );
};

export default Post;
