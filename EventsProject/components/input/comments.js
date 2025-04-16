import { useContext, useEffect, useState } from "react";

import { NotificationContext } from "../../store/notification-context";
import CommentList from "./comment-list";
import classes from "./comments.module.css";
import NewComment from "./new-comment";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(() => {
    if (showComments) {
      setLoadingState(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setLoadingState(false);
        });
    }
  }, [showComments]);

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is being saved into the db",
      status: "pending",
    });
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        console.log(data);
        notificationCtx.showNotification({
          title: "Success!",
          message: "Comment added successfully",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && loadingState && <p>Loading.....</p>}
      {showComments && !loadingState && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
