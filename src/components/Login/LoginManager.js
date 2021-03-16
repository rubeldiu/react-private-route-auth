import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework=()=>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
   return  firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success:true
        };
        return signedInUser;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

 export const handleFbSignIn =() =>{
    const fbprovider = new firebase.auth.FacebookAuthProvider();
  return  firebase
  .auth()
  .signInWithPopup(fbprovider)
  .then((result) => {
    var credential = result.credential;
    var accessToken = credential.accessToken;
    var user = result.user;
    user.success=true;
    return user;
  })
  .catch((error) => {
    console.log(error.message);
  });
  }

 export const handleSignOut = () => {
   return firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error:"",
          success:false
        };
        return signedOutUser;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  export const createUserWithEmailAndPassword=(name,email,password)=>{
   return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name)
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = { };
      newUserInfo.success = false;
      newUserInfo.error = error.message;
      return newUserInfo;
      
    });
  }

  export const signInWithEmailAndPassword =(email,password)=>{
   return firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then((res) => {
      // Signed in
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo = { };
        newUserInfo.success = false;
        newUserInfo.error = error.message;
        return newUserInfo;
    });
  }

 export const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log('User name updated successfully');
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };