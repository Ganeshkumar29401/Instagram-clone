import { collection, getDocs } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Modal, Button, Box, Input } from "@mui/material";
import "./App.css";
import Post from "./components/Post";
import { db, auth } from "./firebase";
function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const postCollectionRef = collection(db, "posts");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid lightgray",
    boxShadow: 24,
    p: 4,
  };

  const signupHandler = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return updateProfile(authUser.user, { displayName: username });
      })
      .catch((err) => console.log(err.message));
    handleClose();
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const signinHandler = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email,password)
    .catch(err => console.log(err));
    setOpenSignin(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [username]);

  useEffect(() => {
    const getVal = async () => {
      const data = await getDocs(postCollectionRef);
      setPosts(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getVal();
  }, [postCollectionRef]);
  return (
    <div className="App">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <center>
            <img
              className="app_logo"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="instagram"
            />
            <form className="form">
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button onClick={signupHandler}>Sign Up</Button>
            </form>
          </center>
        </Box>
      </Modal>

      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <Box sx={style}>
          <center>
            <img
              className="app_logo"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="instagram"
            />
            <form className="form">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button onClick={signinHandler}>Sign In</Button>
            </form>
          </center>
        </Box>
      </Modal>

      <div className="app_header">
        <img
          className="app_logo"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram"
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app_loginContainer">
            <Button onClick={()=>setOpenSignin(true)}>Sign In</Button>
            <Button onClick={handleOpen}>Sign Up</Button>
          </div>
        )}
      </div>
      {posts.map((post) => (
        <Post
          key={post.caption}
          username={post.username}
          caption={post.caption}
          imgUrl={post.imgUrl}
        />
      ))}
    </div>
  );
}

export default App;
