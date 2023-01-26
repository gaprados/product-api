import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateSessionRequest } from "../../domain/dtos/CreateSessionDTO";
import { IUserseRepository } from "../../domain/interfaces/IUsersRepository";

export class CreateSessionService {
  constructor(private usersRepository: IUserseRepository) { }

  public async execute({ email, password }: CreateSessionRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('Incorrect email/password')
    }

    const passwordMatch = await compare(password, user.password!)

    if (!passwordMatch) {
      throw new Error('Incorrect email/password')
    }


    return jwt.sign({ sub: user.id }, 'MYSECRETKEY', { expiresIn: '1d' })
  }
}
