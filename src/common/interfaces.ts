export const LOGIN_COOKIE_KEY = 'LOGIN_SESSION'

export interface GoogleSignInInterface {
  result: boolean
  info?: GoogleUserInfoInterface
}

export interface GoogleUserInfoInterface extends UserInterface {
  email_verified: boolean
  at_hash: string
  picture: string
  given_name: string
  locale: string
  iat: number
  jti: string
}

export interface UserInterface {
  email: string
  exp: number
  name: string
  token: string
}
