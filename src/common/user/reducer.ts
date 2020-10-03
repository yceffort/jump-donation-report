import { UserInterface } from '../interfaces'

export enum UserStatus {
  Login, // 로그인
  LogOut, // 로그아웃
}

export interface UserState {
  status: UserStatus
  user?: UserInterface
}

export type UserAction =
  | { status: UserStatus.Login; user: UserInterface }
  | { status: UserStatus.LogOut }

export const userReducer = (
  state: UserState,
  action: UserAction,
): UserState => {
  switch (action.status) {
    case UserStatus.Login:
      return {
        status: UserStatus.Login,
        user: action.user,
      }

    case UserStatus.LogOut:
      return {
        status: UserStatus.LogOut,
      }

    default:
      throw new Error(`Undefined status ${action}`)
  }
}

export const initialState: UserState = {
  status: UserStatus.LogOut,
}
