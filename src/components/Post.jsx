import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import "./Post.css";

function Post({ title, text, username, id }) {
  return (
    <div className="post" spacing={3}>
      <Grid className="post_container" xs={10}>
        <div className="post_title">
          <Link to={`/post/${id}`} className="post_titleLink">
            <h2>{title}</h2>
          </Link>
        </div>
        <div className="post_text">
          <p>{text}</p>
        </div>
        <div className="post_footer">
          <h5>posted by:</h5>
          <strong>{username}</strong>
          <h5>2020/07/25</h5>
        </div>
        <div className="post_commentBox">
          <ChatBubbleIcon className="post_commentIcon" />
          <span>1000</span>
        </div>
      </Grid>
    </div>
  );
}

export default Post;
