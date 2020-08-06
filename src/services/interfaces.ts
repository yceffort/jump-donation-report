export interface GoogleSignInInterface{
  result: boolean,
  info?: GoogleUserInfoInterface
}

export interface GoogleUserInfoInterface{
  email: string,
  email_verified: boolean,
  at_hash: string,
  name: string,
  picture: string,
  given_name: string,
  locale: string,
  iat: number,
  exp: number, // unix timestamp 날짜 시간 (로그인 만료 시간)
  jti: string
}
