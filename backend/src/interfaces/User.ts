export interface userInput {
  email: string;
  password: string;
}
export interface userData {
  _id: string;
  name: string;
  email: string;
  authenticate(password: string): boolean;
}
export interface responseData {
  token: string;
  expirationDate: Date;
  user: userData;
}
