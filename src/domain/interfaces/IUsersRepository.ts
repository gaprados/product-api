import { CreateUserRequest, CreateUserResponse } from "../dtos/CreateUserDTO";

export interface IUserseRepository {
  create(data: CreateUserRequest): Promise<CreateUserResponse>;
  findByEmail(email: string): Promise<boolean>;
}