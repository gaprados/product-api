export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;

  created_at: Date;
  updated_at: Date;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  email: string;
  age: number | null;

  created_at: Date;
  updated_at: Date;
}


export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}