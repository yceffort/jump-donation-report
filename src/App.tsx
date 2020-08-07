import React from 'react';
import { CookiesProvider } from 'react-cookie';
import Login from './pages/login';
import UserContext from './common/user/context';
import { initialState } from './common/user/reducer';

function App() {
  return (
    <UserContext.Provider value={initialState}>
      <CookiesProvider><Login /> </CookiesProvider>
    </UserContext.Provider>
  );
}

export default App;
