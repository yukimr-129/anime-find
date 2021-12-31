import { client } from '../client'
import Cookies from 'js-cookie'
import { SignInParams, SignUpParams } from 'types/auth/authTypes'
import { EditPasswordUpdate, UserProfileUpdate } from 'types/form/FormInputs'


// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return client.post('/api/v1/auth', params)
}

// サインイン（ログイン）
export const signIn = (params: SignInParams)  => {
  return client.post('/api/v1/auth/sign_in', params)
}

// サインアウト（ログアウト）
export const signOut = () => {
  return client.delete("/api/v1/auth/sign_out", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})  
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return client.get('/api/v1/auth/sessions', { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}

export const updateUserProfile = (params: FormData) => {
  return client.patch('/api/v1/auth', params , {
    headers: {
      "content-Type": "multipart/form-data",
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  })  
}

export const updatePassword = (params: FormData) => {
  return client.patch('/api/v1/auth/password', params , {
    headers: {
      "content-Type": "multipart/form-data",
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }
  })  
}