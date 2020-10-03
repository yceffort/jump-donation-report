import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import { GoogleUserInfoInterface } from '../common/interfaces'

export default function Private({
  userInfo,
}: {
  userInfo?: GoogleUserInfoInterface | null
}) {
  const [auth, setAuth] = useState<boolean | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  const { year } = useParams()

  useEffect(() => {
    if (auth === true && year) {
      console.log('로그인 완료', auth, year)
    }
  }, [year, auth])

  useEffect(() => {
    if (userInfo === undefined) {
      // 아직 로그인 여부 확인 중
      setLoading(true)
    } else if (userInfo === null) {
      // 로그인 실패
      setLoading(false)
      setAuth(false)
    } else {
      setLoading(false)
      setAuth(true)
    }
  }, [userInfo])

  return loading ? (
    <>로딩중</>
  ) : auth === true ? (
    <>로그인되어 있음.{year}</>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  )
}
