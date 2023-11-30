import React,{useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import "../src/Main.css";
import Mypage from './Mypage';
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


import { onAuthStateChanged, signOut,getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from 'firebase/auth';

import { createGlobalStyle } from 'styled-components';
import TodoCreate from "./components/todolist/TodoCreate.js";
import TodoHead from "./components/todolist/TodoHead.js";
import TodoItem from "./components/todolist/TodoItem.js";
import TodoList from "./components/todolist/TodoList.js";
import TodoTemplate from "./components/todolist/TodoTemplate.js";
import { TodoProvider } from './components/todolist/TodoContext.js';

import { analytics} from './fbase';

export default function Main() {
  const [urls, setUrls] = useState([
    "https://www.seoultech.ac.kr/service/info/janghak/", //장학공지
    "https://www.seoultech.ac.kr/service/info/matters/", //학사공지
    "https://iise.seoultech.ac.kr", //학과공지
    "https://www.seoultech.ac.kr/service/info/notice/", //대학공지
  ]); //기본 URL 초기설정 (추후 입력받는 걸로 변경)

 
  
  
  const [userDisplayName, setUserDisplayName] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUserDisplayName(user.displayName);
      } else {
        // User is signed out.
        setUserDisplayName(null);
      }
    });

    return () => {
      // Unsubscribe the observer when the component unmounts
      unsubscribe();
    };
  }, [auth]);

  useEffect(() => {
    // Set session persistence to ensure the user is remembered after a refresh
    setPersistence(auth, browserSessionPersistence);
  }, [auth]);

  






  const gotomypage = () => {
    // Use navigate to go to the '/mypage' route
    navigate('./mypage');
  };
 
  // const auth = getAuth();
  const user = auth.currentUser;
  const providerData = user ? user.providerData : [];
  providerData.forEach((profile) => {
    console.log('name:'+profile.displayName);
  });



  
  const GlobalStyle = createGlobalStyle`
  body {
  
  }
`;


const onLogOutClick = async () => {
    try {
      // Clear session persistence
      await setPersistence(auth, browserSessionPersistence);
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error clearing session persistence:', error);
    }
};

  // const logout = async () => {
  //   const isLogOut = window.confirm(authMessage['auth/logout-confirm']);
  //   if (!isLogOut) return;
  
  //   try {
  //     const auth = getAuth();
  //     await signOut(auth);
  //     setAuthInfo(initialState);
  //     navigate('/');
  //   } catch ({ code, message }) {
  //     alert(errorMessage[code]);
  //   }
  // };











  return (
    <div className="main">
      <div className="navbar">
        <div className="logo"></div> {/* 이미지 파일 */}
        <div className="who"></div> {/* Who SVG 이미지 */}
        <div>
        {providerData.map((profile, index) => (
        <div className="name">{profile.displayName}</div>))}
        </div>

        <div className="mypage" onClick={gotomypage}>mypage</div>    
        <div className="logout" onClick={onLogOutClick}>logout</div>
      </div>

      
      <div className="topbar">

      

         <div className="todo">
         <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
   
      
        </div>  



       


        <div className="calendar">
          {/* <div className="title_cal">Calendar</div> //캘린더 타이틀*/}
          {/* <div className="cal_box"></div> */}
          <FullCalendar
            plugins={[dayGridPlugin, googleCalendarPlugin]}
            nitialView="dayGridMonth"
            googleCalendarApiKey={
              "505023142086-ksfstvllrbegphdf68qhr8fg4ko87nl3.apps.googleusercontent.com"
            }
            events={{
              googleCalendarId: "tpduscnfehd1@gmail.com",
            }}
          />
        </div>
      </div>
      <br></br><br></br>
      <div className="line"></div>
      <div className="noti">
        <div className="noti1">
          <div className="noti1_text">장학공지</div>
          <div className="noti1_box">
              <iframe
              title="WebPage Preview 1"
              src={urls[0]}
              className="noti1_box"
              ></iframe>
          </div>
        </div>
        <div className="noti2">
          <div className="noti2_text">학사공지</div>
          <div className="noti2_box">
            <iframe
              title="WebPage Preview 2"
              src={urls[1]}
              className="noti2_box"
            ></iframe>
          </div>
        </div>
        <div className="noti3">
          <div className="noti3_text">산업정보시스템 공지사항</div>
          <div className="noti3_box">
          <iframe
              title="WebPage Preview 3"
              src={urls[2]}
              className="noti3_box"
            ></iframe>
          </div>
        </div>
        <div className="noti4">
          <div className="noti4_text">대학 공지사항</div>
          <div className="noti4_box">
          <iframe
              title="WebPage Preview 4"
              src={urls[3]}
              className="noti4_box"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}






