import React, { useState } from 'react'
import Header from '../components/header';
import { GoogleUserInfoInterface } from '../common/interfaces';

export default function Home( ) {
  const [userInfo, setUserInfo] = useState<
    GoogleUserInfoInterface | null | undefined
  >()
  const [token, setToken] = useState<string | undefined>()

  return (
  <>
  <Header userInfo={userInfo} token={token} />
  여기는 홈
  </>);
}