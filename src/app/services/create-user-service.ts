import { IUserseRepository } from "../../domain/interfaces/IUsersRepository";
import { CreateUserRequest } from "../../domain/dtos/CreateUserDTO"

export class CreateUserService {
  constructor(private usersRepository: IUserseRepository) { }

  public async execute({ name, email, password, confirmation_password }: CreateUserRequest) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    const isPasswordValid = password.length >= 6;
    const isPasswordConfirmed = password === confirmation_password;

    if (!isPasswordValid) {
      throw new Error('Password must be at least 6 characters')
    }

    if (!isPasswordConfirmed) {
      throw new Error('Password confirmation does not match')
    }

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
  }
}
