import React, { useEffect, useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import UserContext from './common/user/context';
import { initialState } from './common/user/reducer';
import Home from './pages/home';
import Private from './pages/private';
import Public from './pages/public';
import getUser from './services/fetch';
import { GoogleUserInfoInterface, LOGIN_COOKIE_KEY } from './common/interfaces';
import NotFound from './pages/not-found';
import Header from './components/header';

function App() {
  const [cookie] = useCookies();
  const [userInfo, setUserInfo] = useState<GoogleUserInfoInterface | null | undefined>();
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const authToken = cookie[LOGIN_COOKIE_KEY];
      setToken(authToken);
      if (authToken) {
        const { result, info } = await getUser(authToken);
        if (result) {
          setUserInfo(info || null);
        } else {
          setUserInfo(null);
        }
      } else {
        setUserInfo(null);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={initialState}>
      <CookiesProvider>
        <Header userInfo={userInfo} token={token} />
        <Router>
          <Switch>

            <Route path="/:year/private" render={(props) => (<Private userInfo={userInfo} {...props} />)} />

            <Route path="/:year/public">
              <Public />
            </Route>

            <Route exact to path="/">
              <Home />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>

          </Switch>
        </Router>
      </CookiesProvider>
    </UserContext.Provider>
  );
}

export default App;
