import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Post from "./components/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { db, auth } from "./firebase/Firebase";
import IndividualPost from "./components/IndividualPost";
import SignUpModal from "./components/SignUpModal";
import LogInModal from "./components/LogInModal";
import { Button, makeStyles, Modal } from "@material-ui/core";

function App({ match }) {
  const [openSignUp, setOpenSignUp] = useState(false);
  const handleClick = () => {
    setOpenSignUp(!openSignUp);
  };
  const handleClose = () => {
    setOpenSignUp(!openSignUp);
  };

  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => {
    setOpenLogin(!openLogin);
  };
  const handleCloseLogin = () => {
    setOpenLogin(!openLogin);
  };
  const [posts, setPosts] = useState([]);
  const [openAddPost, setOpenAddPost] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");

  const handleOpenAddPost = () => {
    setOpenAddPost(!openAddPost);
  };

  const [user, setUser] = useState(null);
  // Check if user logged in
  const userStat = auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      console.log(authUser);
    }
  });
  useEffect(() => {
    userStat();
    return () => {
      console.log("cleam");
    };
  }, [openAddPost]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      username: "FaizClever",
      text: postText,
      title: postTitle,
    });
    setPostText("");
    setPostTitle("");
    setOpenAddPost(!openAddPost);
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: "4px",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }));
  const classes = useStyles();
  return (
    <div className="app">
      <Router>
        <Header
          handleClick={handleClick}
          handleOpenAddPost={handleOpenAddPost}
          handleOpenLogin={handleOpenLogin}
        />
        {/* Add Post Modal */}
        <Modal
          className={classes.modal}
          onClose={() => setOpenAddPost(!openAddPost)}
          open={openAddPost}
        >
          <div className={classes.paper}>
            <h2 style={{ textAlign: "center" }}>Add Post</h2>
            <form className="app_postForm">
              <input
                value={postTitle}
                className="app_input"
                placeholder="Enter Title"
                onChange={(e) => setPostTitle(e.target.value)}
              />
              <textarea
                value={postText}
                className="app_textArea"
                placeholder="Enter Text"
                onChange={(e) => setPostText(e.target.value)}
              />
              <Button
                type="submit"
                onClick={handleSubmitPost}
                variant="outlined"
                className="app_postButton"
              >
                Post
              </Button>
            </form>
          </div>
        </Modal>
        {/* SIGN UP MODAL */}
        <SignUpModal handleClose={handleClose} openSignUp={openSignUp} />
        <LogInModal handleCloseLogin={handleCloseLogin} openLogin={openLogin} />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) =>
              posts.map(({ id, post }) => (
                <Post
                  id={id}
                  key={post.id}
                  title={post.title}
                  text={post.text}
                  username={post.username}
                />
              ))
            }
          />
          <Route
            path="/post/:id"
            render={(props) => <IndividualPost posts={posts} {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
