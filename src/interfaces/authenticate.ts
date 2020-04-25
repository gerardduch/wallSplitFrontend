import { User } from './user';

export interface UserJwt {
  expiresIn: number;
  accessToken: string;
}

export interface AuthenticateResponse {
  user: User;
  userJwt: UserJwt;
}

export interface Credentials {
  email: string;
  password: string;
}
