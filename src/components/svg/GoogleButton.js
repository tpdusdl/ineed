import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google'; // useGoogleLogin 가져오기

const GoogleButton = () => {
  const googleSocialLogin = useGoogleLogin({ // 여기서 useGoogleLogin 호출
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  });

  const movePage = useNavigate();
  function gotomain(){
    movePage('user/main');
}
  return (
    <GoogleOAuthProvider clientId={`${'505023142086-ksfstvllrbegphdf68qhr8fg4ko87nl3.apps.googleusercontent.com'}`}>
      <GoogleLogin
        onSuccess={(res) => {gotomain} } 
        onFailure={(res) => console.log(res, '실패')}
        render={(renderProps) => (
          <div className='social_login_box google' onClick={renderProps.onClick}>
            <div className='social_login_image_box'>
            
            </div>
            <div className='social_login_text_box'>구글로 시작하기</div>
            <div className='social_login_blank_box'> </div>
          </div>
        )}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleButton;











// import React, {useCallback, useEffect} from 'react';
// import GoogleLogin from 'react-google-login';
// import {gapi} from 'gapi-scipt';
// import { ReactComponent as Google_login } from "./components/svg/google_login.svg";
// const clientId='505023142086-ksfstvllrbegphdf68qhr8fg4ko87nl3.apps.googleusercontent.com';
// const GoogleButton =({onSocial})=> {

//     useEffect(()=>{
//         function start(){
//             gapi.client.init({
//                 clientId,
//                 scope:'email',
//             });
//         }

//         gapi.load('client:auth2', start);
//     }, []);

//     const onSuccess = (response)=>{
//         console.log(response);
//     };

//     const onFailure = (response)=>{
//         console.log(response);
//     };
//     return (
//         <div>
//         <GoogleLogin
//         clientId={clientId}
//         buttonText="구글아이디로 로그인하기"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         />
//         </div>
//     );
// };

// export default GoogleButton;