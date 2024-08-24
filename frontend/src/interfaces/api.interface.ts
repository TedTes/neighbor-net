export interface User {
  name: string;
  email: string;
  password: string;
  _id?: string;
}

export interface ApiResponse {
  success: boolean;
  data: User;
  message?: string;
  error?: any;
}
export interface Params {
  userId: string;
}
export interface Credential {
  auth_token: string;
}
