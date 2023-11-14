import { ReactComponent as Username } from "./components/svg/Id.svg";
import { ReactComponent as Password } from "./components/svg/pw.svg";
import { ReactComponent as Name } from "./components/svg/ineed_name.svg";
import { ReactComponent as  Next} from "./components/svg/next.svg";
import { ReactComponent as Login_with_others} from "./components/svg/loginwithothers.svg";
import { ReactComponent as GoogleLogin} from "./components/svg/google_login.svg";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { analytics } from './fbase';
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';
import { FirebaseApp} from "firebase/app";
import { useState } from 'react';
import React from 'react';
// import { getAuth, signInWithRedirect } from "firebase/auth";
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from "react-router-dom";

import { initializeApp } from 'firebase/app';

import { getAnalytics } from "firebase/analytics";
import Main from "./Main";


function Login() {


  const [userData, setUserData] = useState(null);
  const movePage = useNavigate("");




  const firebaseConfig = {
    apiKey: "AIzaSyC4RubiI1k7n2ivGw0leIXxELKQy1aFfo0",
    authDomain: "ineed-eeb6c.firebaseapp.com",
    projectId: "ineed-eeb6c",
    storageBucket: "ineed-eeb6c.appspot.com",
    messagingSenderId: "524655598727",
    appId: "1:524655598727:web:a0253edc9e57ab44d96c22",
    measurementId: "G-TKNFG5D5KG"
  };
  const firebaseApp = initializeApp(firebaseConfig);

  
  const handleGoogleLogin1 = async () => {
    const auth=getAuth(firebaseApp);
    const provider=new GoogleAuthProvider();
    try{
      const result=await signInWithPopup(auth, provider);
      console.log(result.user.uid);
      console.log(await result.user.getIdToken());
      movePage('user/main');
    }catch(error){
      console.error('에러발생',error);
    }

    // const result = await signInWithPopup(new GoogleAuthProvider());
    // console.log(result.user.uid);
    // console.log(await result.user.getIdToken());
  }

  
  


  
 
  function handleGoogleLogin(){
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(analytics, provider) // popup을 이용한 signup
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data) // console로 들어온 데이터 표시
      movePage('user/main');
      })
      .catch((err) => {
        console.log(err);
      });
    }
   

    function gotomain(){
        movePage('user/main');
    }
  
    
    
    
    return(
   
<div className="Login">
      <p>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
      </p>
    <Name />
    <p></p>


     <p><Username /></p>
     
     <p><Password /></p>
     <p><Next onClick={gotomain} /></p>
     <p><Login_with_others /></p>
     
  
  
    <GoogleLogin onClick={handleGoogleLogin1}/>
     {userData ? userData.displayName : null}
         </div> 

    
    );

}
export default Login;