import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import Header from '../components/header'
import { GoogleUserInfoInterface, LOGIN_COOKIE_KEY } from '../common/interfaces'
import getUser from '../services/fetch'

export default function Home() {
  const [cookie] = useCookies()
  const [userInfo, setUserInfo] = useState<
    GoogleUserInfoInterface | null | undefined
  >()
  const [token, setToken] = useState<string | undefined>()

  useEffect(() => {
    ;(async () => {
      const authToken = cookie[LOGIN_COOKIE_KEY]
      setToken(authToken)
      if (authToken) {
        const { result, info } = await getUser(authToken)
        if (result) {
          setUserInfo(info || null)
        } else {
          setUserInfo(null)
        }
      } else {
        setUserInfo(null)
      }
    })()
  }, [cookie])

  return (
    <>
      <Header userInfo={userInfo} token={token} />
      여기는 홈
    </>
  )
}
