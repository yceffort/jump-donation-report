import React, { useReducer } from 'react';
import { useCookies } from 'react-cookie';
import getUser from '../services/fetch';
import { userReducer, initialState, UserStatus } from '../common/user/reducer';

const LOGIN_COOKIE = 'LOGIN_SESSION';
const CLIENT_ID = '450893975309-gr4ed18b4733vapf59l35e150i927vlq.apps.googleusercontent.com';
export default function Login() {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const [, setCookie, removeCookie] = useCookies([LOGIN_COOKIE]);

  async function signOut() {
    dispatch({
      status: UserStatus.LogOut,
    });
    removeCookie(LOGIN_COOKIE);
    await window.gapi.auth2.getAuthInstance().signOut();
  }

  const onSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
    window.gapi.load('auth2', async () => {
      window.gapi.auth2.init({
        client_id: CLIENT_ID,
      });
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      const options = new window.gapi.auth2.SigninOptionsBuilder();
      options.setPrompt('select_account');
      options.setScope('profile').setScope('email');

      const response = await GoogleAuth.signIn(options);
      const authResponse = response.getAuthResponse();
      const token = authResponse.id_token;
      const { result, info } = await getUser(token);

      if (result && info) {
        const expDate = info.exp
          ? new Date(info.exp)
          : new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        setCookie(LOGIN_COOKIE, token, { path: '/', expires: expDate });

        dispatch({
          status: UserStatus.Login,
          user: {
            email: info.email,
            exp: info.exp,
            name: info.name,
          },
        });
      } else {
        await signOut();
      }
    });
  };

  const onSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e) {
      e.preventDefault();
    }
    await signOut();
  };

  return (
    <>
      <button type="button" onClick={onSignIn}>
        로그인
      </button>
      <button type="button" onClick={onSignOut}>
        로그아웃
      </button>

      {JSON.stringify(userState)}
    </>
  );
}
