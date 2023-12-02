import React,{useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import "../src/Main.css";
import Mypage from './Mypage';
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import TextField from '@mui/material/TextField';
 import AppBar from '@mui/material/AppBar';
 import Toolbar from '@mui/material/Toolbar';
 import Typography from '@mui/material/Typography';
 import Button from '@mui/material/Button';


import { onAuthStateChanged, signOut,getAuth, GoogleAuthProvider,
   signInWithPopup, setPersistence, signInWithEmailAndPassword, 
   browserSessionPersistence, signInWithRedirect
   } from 'firebase/auth';

// import { createGlobalStyle } from 'styled-components';
// import TodoCreate from "./components/todolist/TodoCreate.js";
// import TodoHead from "./components/todolist/TodoHead.js";
// import TodoItem from "./components/todolist/TodoItem.js";
// import TodoList from "./components/todolist/TodoList.js";
// import TodoTemplate from "./components/todolist/TodoTemplate.js";
// import { TodoProvider } from './components/todolist/TodoContext.js';


import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, setDoc, doc,
  deleteDoc, getDocs, query, orderBy ,where
} from "firebase/firestore";
import { initializeApp } from "firebase/app";



  const firebaseConfig = {
    apiKey: "AIzaSyC4RubiI1k7n2ivGw0leIXxELKQy1aFfo0",
    authDomain: "ineed-eeb6c.firebaseapp.com",
    projectId: "ineed-eeb6c",
    storageBucket: "ineed-eeb6c.appspot.com",
    messagingSenderId: "524655598727",
    appId: "1:524655598727:web:a0253edc9e57ab44d96c22",
    measurementId: "G-TKNFG5D5KG"
  };
  const app = initializeApp(firebaseConfig);
  const analytics=getAnalytics(app);
  const db=getFirestore(app);

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);








  const TodoItemInputField = (props) => {
    const [input, setInput] = useState("");
  
    const onSubmit = () => {
      props.onSubmit(input);
      setInput("");
    };

    return (<div>
      <TextField
        id="todo-item-input"
        label="Todo Item"
        variant="outlined"
        onChange={(e) => setInput(e.target.value)} value={input}
      />
      <Button variant="outlined" onClick={onSubmit}>등록하기</Button>
    </div>);
  };

  const TodoItem = (props) => {
    const style = props.todoItem.isFinished ? { textDecoration: 'line-through' } : {};
    const handleCheckboxClick = () => {
      props.onTodoItemClick(props.todoItem);
    };
    return (<li>
<input
        type="checkbox"
        checked={props.todoItem.isFinished}
        onChange={handleCheckboxClick}
      />
      <span style={style}>{props.todoItem.todoItemContent}</span>
      <Button variant="outlined" onClick={() => props.onRemoveClick(props.todoItem)}>
        삭제
      </Button>
    </li>
  );
};

  const TodoItemList = (props) => {
    const todoList = props.todoItemList.map((todoItem, index) => {
      return <TodoItem
        key={index}
        todoItem={todoItem}
        onTodoItemClick={props.onTodoItemClick}
        onRemoveClick={props.onRemoveClick}
      />;
    });
    return (<div>
      <ul>{todoList}</ul>
    </div>);
  };
  

  const TodoListAppBar = () => {
   
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo List 
          </Typography>
          {/* {button} */}
        </Toolbar>
      </AppBar>
    );
  };

  export default function Main() {
  const [currentUser, setCurrentUser] = useState(null);
  const [todoItemList, setTodoItemList] = useState([]);

 
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user.uid);
    } else {
      setCurrentUser(null);
    }
  });

  const syncTodoItemListStateWithFirestore = () => {
    const q = query(collection(db, "todoItem"), where("userId", "==", currentUser), orderBy("createdTime", "desc"));
 

    getDocs(q).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          todoItemContent: doc.data().todoItemContent,
          isFinished: doc.data().isFinished,
          createdTime: doc.data().createdTime ?? 0,
          userId: doc.data().userId,
        });
      });
      setTodoItemList(firestoreTodoItemList);
    });
  };


  useEffect(() => {
    syncTodoItemListStateWithFirestore();
 
  }, [currentUser]);
  const onSubmit = async (newTodoItem) => {
    await addDoc(collection(db, "todoItem"), {
      todoItemContent: newTodoItem,
      isFinished: false,
      createdTime: Math.floor(Date.now() / 1000),
      userId: currentUser,
    });
    syncTodoItemListStateWithFirestore();
  };
  const onTodoItemClick = async (clickedTodoItem) => {
    const todoItemRef = doc(db, "todoItem", clickedTodoItem.id);
    await setDoc(todoItemRef, { isFinished: !clickedTodoItem.isFinished }, { merge: true });
    syncTodoItemListStateWithFirestore();
  };

  const onRemoveClick = async (removedTodoItem) => {
    const todoItemRef = doc(db, "todoItem", removedTodoItem.id);
    await deleteDoc(todoItemRef);
    syncTodoItemListStateWithFirestore();
  };






 

  const [currentUrl, setCurrentUrl] = useState("");

  const [urls, setUrls] = useState([
    "https://www.seoultech.ac.kr/service/info/janghak/", //장학공지
    "https://www.seoultech.ac.kr/service/info/matters/", //학사공지
    "https://iise.seoultech.ac.kr", //학과공지
    "https://www.seoultech.ac.kr/service/info/notice/", //대학공지
  ]); //기본 URL 초기설정 (추후 입력받는 걸로 변경)

 
  
  
  const [userDisplayName, setUserDisplayName] = useState(null);
  const navigate = useNavigate();
  

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



  
//   const GlobalStyle = createGlobalStyle`
//   body {
  
//   }
// `;


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

      
      <div className='todo'>
      <TodoListAppBar />
       <TodoItemInputField onSubmit={onSubmit} />
       <TodoItemList
         todoItemList={todoItemList}
         onTodoItemClick={onTodoItemClick}
         onRemoveClick={onRemoveClick}
       />

      </div>
         {/* <div className="todo">
         <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
   
      
        </div>   */}



       


        <div className="calendar">
         
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
