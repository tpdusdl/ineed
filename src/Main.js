import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../src/Main.css";

import googleCalendarPlugin from "@fullcalendar/google-calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Main() {
  const [urls, setUrls] = useState([
    "https://www.seoultech.ac.kr/service/info/janghak/", //장학공지
    "https://www.seoultech.ac.kr/service/info/matters/", //학사공지
    "https://iise.seoultech.ac.kr", //학과공지
    "https://www.seoultech.ac.kr/service/info/notice/", //대학공지
  ]); //기본 URL 초기설정 (추후 입력받는 걸로 변경)

  const handleInputChange = (index, event) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = event.target.value;
    setUrls(updatedUrls);
  };

  return (
    <div className="main">
      <div className="navbar">
        <div className="logo"></div> {/* 이미지 파일 */}
        <div className="who"></div> {/* Who SVG 이미지 */}
        <div className="name">rka</div>
        <div className="mypage">mypage</div>
        <div className="logout">logout</div>
      </div>

      {/* <div style={todolistStyle}></div>
      <div style={CalenderStyle}></div> */}
      <div className="topbar">
        <div className="todo">
          <div className="title_todo">
            To do list
            <div className="todo_plus">+</div>
          </div>
          <div className="todo_box">
            <div className="list">
              <div className="checkbox"></div>
              <div className="list_text">개발세션 정기미팅 5:30</div>
              <div className="setting"></div>
            </div>
            <div className="list_line"></div>
            <div className="list">
              <div className="checkbox"></div>
              <div className="list_text">개발세션 정기미팅 5:30</div>
              <div className="setting"></div>
            </div>
            <div className="list_line"></div>
            <div className="list">
              <div className="checkbox"></div>
              <div className="list_text">개발세션 정기미팅 5:30</div>
              <div className="setting"></div>
            </div>
            <div className="list_line"></div>
          </div>
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





