import { CreateUserRequest, CreateUserResponse, UserDTO } from "../dtos/CreateUserDTO";

// FIXME: MELHORAR TIPAGENS (as com Partial)
export interface IUserseRepository {
  create(data: Partial<CreateUserRequest>): Promise<CreateUserResponse>;
  findByEmail(email: string): Promise<Partial<UserDTO> | null>;
  findById(id: string): Promise<Partial<UserDTO> | null>;
  checkPassword(userPassword: string, password: string): Promise<boolean>;
}