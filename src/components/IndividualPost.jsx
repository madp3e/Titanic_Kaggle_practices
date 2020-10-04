import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { db } from "../firebase/Firebase";
import "./IndividualPost.css";

function IndividualPost({ posts, match }) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    db.collection("posts")
      .doc(match.params.id)
      .onSnapshot((snapshot) => {
        setPost(snapshot.data());
      });
    console.log(post);
  }, []);

  useEffect(() => {
    db.collection("posts")
      .doc(match.params.id)
      .collection("comments")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            comment: doc.data(),
          }))
        );
      });
  }, []);

  const handleAddComent = (e) => {
    e.preventDefault();
    db.collection("posts").doc(match.params.id).collection("comments").add({
      username: "FaizClever",
      text: comment,
    });
    setComment("");
  };

  const handleDeleteComment = (id) => {
    db.collection("posts")
      .doc(match.params.id)
      .collection("comments")
      .doc(id)
      .delete();
    console.log(id);
  };

  return (
    <div className="individualPost">
      <Grid container className="individualPost_container" xs={10}>
        <div className="individualPost_title">
          <h2>{post.title}</h2>
        </div>
        <div className="individualPost_text">
          <p>{post.text}</p>
        </div>
        <div className="individualPost_footer">
          <h5>{"Posted by:"}</h5>
          <strong>{post.username}</strong>
          <h5>{"2020/07/25"}</h5>
        </div>
        <div className="individualPost_commentBox">
          <ChatBubbleIcon className="individualPost_commentIcon" />
          <span>{comments.length}</span>
        </div>
        <div className="individualPost_commentInput">
          <form className="individualPost_commentForm">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="individualPost_addComment"
              placeholder="enter comment"
            />
            <button
              type="submit"
              onClick={handleAddComent}
              className="individualPost_commentButton"
            >
              SEND
            </button>
          </form>
        </div>
      </Grid>
      {/* Comment sec */}

      {comments.map(({ id, comment }) => (
        <div className="individualPost_commentSec">
          <Avatar className="individualPost_avatar" />
          <div className="individualPost_commentHeader">
            <div className="individual_cmtBoxHeader">
              <h5 className="dlt-btn">{comment.username}</h5>
              <Button
                onClick={() => handleDeleteComment(id)}
                color="secondary"
                size="small"
                variant="outlined"
              >
                x
              </Button>
            </div>

            <Typography className="individualPost_userName" variant="subtitle2">
              {comment.text}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
}

export default IndividualPost;
