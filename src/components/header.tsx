import React, { useReducer, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { userReducer, initialState, UserStatus } from '../common/user/reducer'
import { GoogleUserInfoInterface } from '../common/interfaces'
// import getUser from '../services/fetch'

const MenuHeader = styled.div`
  height: 80px;
  border: 1px red solid;
`

// const CLIENT_ID = '450893975309-gr4ed18b4733vapf59l35e150i927vlq.apps.googleusercontent.com'

export default function Header({
  userInfo,
  token,
}: {
  userInfo?: GoogleUserInfoInterface | null
  token?: string
}) {
  const [userState, dispatch] = useReducer(userReducer, initialState)

  // const [, setCookie, removeCookie] = useCookies([LOGIN_COOKIE_KEY])

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
      })
    }
  }, [userInfo, token])

  return (
    <MenuHeader>
      {userState && userState.user ? (
        <>
          <p>{userState.user.email}</p>
        </>
      ) : (
        <>
          <p>로그인해주세요.</p>
        </>
      )}
      <Link to="/login">로그인페이지로 이동</Link>
    </MenuHeader>
  )
}
