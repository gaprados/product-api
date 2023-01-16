import { IUserseRepository } from "../../domain/interfaces/IUsersRepository";

export class GetUserById {
  constructor(private usersRepository: IUserseRepository) { }

  public async execute(id: string) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
  }
}