import React, { useState } from "react";
import "../src/Mypage.css";





 const Mypage = () => {
  
  const [containers, setContainers] = useState([
    <div className="ineed_container">
      <div className="ineed_box">
        <div className="frame_img"></div>
        <div className="ineed_text">
          <div className="ineed_title">장학공지</div>
          <div className="ineed_url">
            https://www.seoultech.ac.kr/service/info/janghak/
          </div>
        </div>
        <div className="ineed_fix"></div>
        <div className="ineed_del"></div>
      </div>
    </div>,
  ]);

  const addNewContainer = () => {
    const newContainer = (
      <div className="ineed_container">
        <div className="ineed_box">
          <div className="frame_img"></div>
          <div className="ineed_text">
            <div className="ineed_title">장학공지</div>
            <div className="ineed_url">
              https://www.seoultech.ac.kr/service/info/janghak/
            </div>
          </div>
          <div className="ineed_fix"></div>
          <div className="ineed_del"></div>
        </div>
      </div>
    );

    setContainers([...containers, newContainer]); // 새로운 ineed 추가
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo"></div> {/* 이미지 파일 */}
        <div className="who"></div> {/* Who SVG 이미지 */}
      </div>

      <div className="text">
        <div className="text1">나의 Ineed 수정</div>
        <div className="text2">HOME > Mypage > Ineed 수정</div>
      </div>
      <div className="line"></div>

      <div className="ineed_container">
        <div className="ineed_box">
          <div className="frame_img"></div>
          <div className="ineed_text">
            <div className="ineed_title">장학공지</div>
            <div className="ineed_url">
              https://www.seoultech.ac.kr/service/info/janghak/
            </div>
          </div>
          <div className="ineed_fix"></div>
          <div className="ineed_del"></div>
        </div>
      </div>

      {containers.map((container, index) => (
        <div key={index}>{container}</div>
      ))}

      <div className="ineed_add" onClick={addNewContainer}>
        <div className="icon_plus">+</div>
      </div>

      <div className="line2"></div>

      <div className="logout_box">
        <div className="logout_text">로그아웃</div>
      </div>
      <div className="deleteacc_box">
        <div className="deleteacc_text">회원탈퇴</div>
      </div>
    </div>
  );
  
};

export default Mypage;
