
import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import "../src/Mypage.css";
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { onAuthStateChanged, signOut,getAuth, GoogleAuthProvider,
  setPersistence, 
  browserSessionPersistence, 
  } from 'firebase/auth';

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

 



 const UrlItemInputField = (props) => {
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");

  const onSubmit = () => {
    props.onSubmit(input);
    setInput("");
  };

  return (<div>
    <TextField
      id="url-item-input"
      label="Url Item"
      variant="outlined"
      onChange={(e) => setInput(e.target.value)} value={input}
    />
    <Button variant="outlined" 
    onClick={onSubmit}>추가하기</Button>
  </div>);
};

const UrlItem = (props) => {
  console.log( props.urlItem);
  const style = props.urlItem.isFinished ? { textDecoration: 'line-through' } : {};
  const handleCheckboxClick = () => {
    props.onUrlItemClick(props.urlItem);
    
  };
  return (<li>

    <span style={style}>{props.urlItem.urlItemContent}</span>
    <Button variant="outlined" onClick={() => props.onRemoveClick(props.urlItem)}>
      삭제
    </Button>
  </li>
  
);
};

const UrlItemList = (props) => {
  const urlList = props.urlItemList.map((urlItem, index) => {
    return(
      <div key={index}>
     <UrlItem
      key={index}
      urlItem={urlItem}
      onUrlItemClick={props.onUrlItemClick}
      onRemoveClick={props.onRemoveClick}
      gotomain={() => props.gotomain(urlItem)}
    />
     
    {/* <Button
             variant="outlined"
             onClick={() => props.gotomain(urlItem)}
           >
             View in Main
           </Button> */}
         </div>
    );
  });
  return (<div>
    <ul>{urlList}</ul>
  </div>);
};


const UrlListAppBar = () => {
 
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        url list
        </Typography>
        {/* {button} */}
      </Toolbar>
    </AppBar>
  );
};








export default function Mypage(){

  const navigate = useNavigate();
  const gotomain = (urlItem) => {
    // Use navigate to go to the '/mypage' route
    
    navigate('../user/main',{ state: {urlItemContent: urlItem.urlItemContent}} );
    console.log('main으로 보내기',urlItem);
  };
  

  const [currentUser, setCurrentUser] = useState(null);
  const [urlItemList, setUrlItemList] = useState([]);
 
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user.uid);
    } else {
      setCurrentUser(null);
    }
  });


  const syncUrlItemListStateWithFirestore = () => {
    const q = query(collection(db, "urlItem"), where("userId", "==", currentUser), orderBy("createdTime", "desc"));
    
    getDocs(q).then((querySnapshot) => {
      const firestoreUrlItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreUrlItemList.push({
          id: doc.id,
          urlItemContent: doc.data().urlItemContent,
          isFinished: doc.data().isFinished,
          createdTime: doc.data().createdTime ?? 0,
          userId: doc.data().userId,
        });
      });
      setUrlItemList(firestoreUrlItemList);
    });
  };


  useEffect(() => {
    syncUrlItemListStateWithFirestore();
    }, [currentUser]);



  const onSubmit = async (newUrlItem) => {
    await addDoc(collection(db, "urlItem"), {
      urlItemContent: newUrlItem,
      isFinished: false,
      createdTime: Math.floor(Date.now() / 1000),
      userId: currentUser,
    });
    syncUrlItemListStateWithFirestore();
   
  };


  const onUrlItemClick = async (clickedUrlItem) => {
    const urlItemRef = doc(db, "urlItem", clickedUrlItem.id);
    await setDoc(urlItemRef, { isFinished: !clickedUrlItem.isFinished }, { merge: true });
    syncUrlItemListStateWithFirestore();
  };

  const onRemoveClick = async (removedUrlItem) => {
    const urlItemRef = doc(db, "urlItem", removedUrlItem.id);
    await deleteDoc(urlItemRef);
    syncUrlItemListStateWithFirestore();
  };



  const [userDisplayName, setUserDisplayName] = useState(null);
  
  

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

  

  const user = auth.currentUser;
  const providerData = user ? user.providerData : [];
  providerData.forEach((profile) => {
    console.log('name:'+profile.displayName);
  });





  return (
    <div>
      <div className="navbar">
        <div className="logo"></div> {/* 이미지 파일 */}
        <div className="who">   </div>
        {providerData.map((profile, index) => (
        <div className="name">{profile.displayName}</div>))}
        {/*Who SVG 이미지*/}
        <div className="gotomain" onClick={gotomain}>Main</div> 
      </div>

      <div className="text">
        <div className="text1">나의 Ineed 수정</div>
        <div className="text2">HOME > Mypage > Ineed 수정</div>
      </div>
      <div className="line"></div>

      <div className="ineed_container">
        
         
          <div className="ineed_text">
            <div className="ineed_title"></div>
            
            <div className="ineed_url">
            <UrlListAppBar/>
        <UrlItemInputField onSubmit={onSubmit} />
     
     <UrlItemList
    urlItemList={urlItemList}
    onUrlItemClick={onUrlItemClick}
    onRemoveClick={onRemoveClick}
    
  />
          
     </div>
          
        </div>


      </div>

     

      

      <div className="line2"></div>

     
    </div>
  );
  
};


