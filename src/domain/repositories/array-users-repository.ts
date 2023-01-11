import { randomUUID } from 'node:crypto'
import { CreateUserRequest, CreateUserResponse } from '../dtos/CreateUserDTO'
import { IUserseRepository } from '../interfaces/IUsersRepository'

export class UserRepository implements IUserseRepository {

  private users: CreateUserResponse[] = []

  public async create({ name, email, password }: CreateUserRequest) {
    const user = {
      id: randomUUID(),
      name,
      email,
      age: null,
      // FIXME: Hash password
      password,
      created_at: new Date(),
      updated_at: new Date(),
    } as CreateUserResponse

    this.users.push(user)


    return user
  }

  findByEmail(email: string): Promise<boolean> {
    return new Promise((resolve) => {
      const user = this.users.find(user => user.email === email)

      return resolve(!!user)
    })
  }

}