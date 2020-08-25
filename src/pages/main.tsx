import React, { useReducer, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import UserContext from '../common/user/context';
import { initialState, userReducer, UserStatus } from '../common/user/reducer';
import { GoogleUserInfoInterface } from '../common/interfaces';

// const LOGIN_COOKIE = 'LOGIN_SESSION';
function Main({
  token,
  userInfo,
  history,
}: {
  token?: string
  userInfo?: GoogleUserInfoInterface
  history: any
}) {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (userInfo && token) {
      dispatch({
        status: UserStatus.Login,
        user: {
          email: userInfo.email,
          exp: userInfo.exp,
          name: userInfo.name,
          token,
        },
      });
    }
  }, [userInfo, token]);

  const moveLogin = () => {
    history.push('/login');
  };

  return (
    <>
      <UserContext.Provider value={initialState}>
        <CookiesProvider>
          <div>메인페이지</div>
          {/* <Login token={token} userInfo={userInfo} /> */}
          <button type="button" onClick={moveLogin}>로그인하러가기</button>
        </CookiesProvider>
      </UserContext.Provider>

      {JSON.stringify(userState)}
    </>
  );
}

export default Main;
