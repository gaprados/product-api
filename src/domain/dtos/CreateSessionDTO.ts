export interface CreateSessionRequest {
  email: string;
  password: string;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  email: string;

  created_at: Date;
  updated_at: Date;
}