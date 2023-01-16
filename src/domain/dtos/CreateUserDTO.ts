export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;

  created_at: Date;
  updated_at: Date;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  confirmation_password: string;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  email: string;

  created_at: Date;
  updated_at: Date;
}