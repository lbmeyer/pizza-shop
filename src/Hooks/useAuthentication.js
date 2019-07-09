import { useEffect, useState } from 'react';

const auth = window.firebase.auth();
const provider = new window.firebase.auth.GoogleAuthProvider();

export function useAuthentication() {
  const [authenticated, setAuthenticated] = useState('loading');

  function login() {
    auth.signInWithPopup(provider);    
  }

  function logout() {
    auth.signOut()
      .then(function() {
        // signout successfull
      })
      .catch(function(err) {
        // An error occured
        console.log(err);
      });
  }

  useEffect(() => {
    auth.onAuthStateChanged(function(user){
      if(user) {
        setAuthenticated(user);
        console.log(user);
        
      } else {
        setAuthenticated(); // set authenticated to null (no useer)
      }
    }, function(err) {
      console.log(err);
    });
  }, []);

  return {
    login,
    loggedIn: authenticated,
    logout
  };
}
