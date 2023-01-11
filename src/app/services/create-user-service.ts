import { IUserseRepository } from "../../domain/interfaces/IUsersRepository";
import { CreateUserRequest } from "../../domain/dtos/CreateUserDTO"

export class CreateUserService {
  constructor(private usersRepository: IUserseRepository) { }

  public async execute({ name, email, password }: CreateUserRequest) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    const isPasswordValid = password.length >= 6;

    if (!isPasswordValid) {
      throw new Error('Password must be at least 6 characters')
    }

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password
    })

    return user
  }
}
