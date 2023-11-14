import React from "react";
import { useNavigate } from "react-router-dom";

import Who from "./components/main/who.svg";
import Logout from "./components/main/Logout.svg";
import Logo from './components/main/logo.png';
import Mypage from './components/main/Mypage.svg';
import Todolist from './components/main/todolist.svg';
import Calender from './components/main/calender.svg';

import googleCalendarPlugin from '@fullcalendar/google-calendar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { BrowserRouter } from "react-router-dom";








const todolistStyle = {
  background: `url(${Todolist})`, // Todolist 이미지를 배경으로 설정
  width:"250px" ,
  height:"200px",  // 높이 조절
  position: "relative", // 위치 지정
  backgroundSize: 'cover',
};

const CalenderStyle = {
  background: `url(${Calender})`, // Todolist 이미지를 배경으로 설정
  width:"300px" ,
  height:"400px",  // 높이 조절
  position: "relative", // 위치 지정
  backgroundSize: 'cover',
};




export default function Main() {  


  





  return(
  
    <div className="Main">
      
      <img src={Logo} alt="Logo" /> {/* 이미지 파일 */}
      <img src={Who} alt="Who" /> {/* Who SVG 이미지 */}
      <img src={Mypage} alt="mypage" />
      <img src={Logout} alt="Logout" /> {/* Logout SVG 이미지 */}
      <div style={todolistStyle}></div>
      <div style={CalenderStyle}>

      
    






      </div>
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        nitialView="dayGridMonth"
        googleCalendarApiKey={'505023142086-ksfstvllrbegphdf68qhr8fg4ko87nl3.apps.googleusercontent.com'}
        events={{
          googleCalendarId: 'tpduscnfehd1@gmail.com',
        }}
      />



      
      </div>


  );
}