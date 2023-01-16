import jwt from 'jsonwebtoken'
import { IUserseRepository } from "../../domain/interfaces/IUsersRepository";
import { CreateSessionRequest } from "../../domain/dtos/CreateSessionDTO";

export class CreateSessionService {
  constructor(private usersRepository: IUserseRepository) { }

  public async execute({ email, password }: CreateSessionRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    const checkPassword = await this.usersRepository.checkPassword(user.password!, password)

    if (!checkPassword) {
      throw new Error('Incorrect password')
    }


    return jwt.sign({ sub: user.id }, 'MYSECRETKEY', { expiresIn: '1d' })
  }
}
