export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  roleId: number;
}

export interface AuthenticateRequest {
  email: string;
  password: string;
}

export interface RefreshAccessTokenRequest {
  id: string | null;
  refreshToken: string | null;
}
