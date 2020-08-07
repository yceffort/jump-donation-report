import React, { useEffect, useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import Login from './pages/login';
import UserContext from './common/user/context';
import { initialState } from './common/user/reducer';
import getUser from './services/fetch';
import { GoogleUserInfoInterface } from './common/interfaces';

const LOGIN_COOKIE = 'LOGIN_SESSION';
function App() {
  const [cookie] = useCookies([LOGIN_COOKIE]);
  const [userInfo, setUserInfo] = useState<GoogleUserInfoInterface | undefined>();
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const authToken = cookie[LOGIN_COOKIE];
      setToken(authToken);
      if (authToken) {
        const { result, info } = await getUser(authToken);
        if (result) {
          setUserInfo(info);
        }
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={initialState}>
      <CookiesProvider>
        <Login token={token} userInfo={userInfo} />
      </CookiesProvider>
    </UserContext.Provider>
  );
}

export default App;
