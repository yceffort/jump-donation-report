import React from 'react';
import getUser from './services/fetch';

const CLIENT_ID = '450893975309-gr4ed18b4733vapf59l35e150i927vlq.apps.googleusercontent.com';

function App() {
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
      const userResponse = await getUser(token);
      console.log(userResponse);
    });
  };
  const onSignOut = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
    }
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      await GoogleAuth.signOut();
  };

  return (
    <>
      <button type="button" onClick={onSignIn}>
        로그인
      </button>
      <button type="button" onClick={onSignOut}>
        로그아웃
      </button>
    </>
  );
}

export default App;
