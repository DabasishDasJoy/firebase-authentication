import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import "./App.css";
import app from "./firebase/firebase.init";

const auth = getAuth(app); // Initialize a firebase authentication and get a reference
function App() {
  //get the provider to auth with goole, facebook etc.
  //First go and register the app
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState({});

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
      })
      .catch((error) => console.error(error));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="App">
      {user.email ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <button onClick={handleSignIn}>Google Sign In</button>
          <button onClick={handleGitHubSignIn}>Github Sign In</button>
        </>
      )}
      {user.email && (
        <div>
          <p>User: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
