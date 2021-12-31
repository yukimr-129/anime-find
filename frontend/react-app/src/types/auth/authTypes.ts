// サインアップ
export type SignUpParams = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    confirmSuccessUrl?: string;
}

// サインイン
export type SignInParams = {
    email: string;
    password: string;
  }
  
  // ユーザー
  export type User = {
    id: number;
    uid: string;
    provider: string;
    email: string;
    name: string;
    nickname?: string;
    image?: {
      url: string | null;
    };
    allowPasswordChange: boolean;
    created_at: Date;
    updated_at: Date;
  }