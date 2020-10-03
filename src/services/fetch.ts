import fetch from 'isomorphic-fetch'

import { GoogleSignInInterface } from '../common/interfaces'

export default async function getUser(
  token: string,
): Promise<GoogleSignInInterface> {
  const url = `https://us-central1-jumpsp-admin.cloudfunctions.net/jump-google-sign-in?token=${token}`
  const response = await fetch(url)
  return response.json()
}
