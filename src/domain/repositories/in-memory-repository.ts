import { randomUUID } from 'node:crypto'
import { CreateUserRequest, CreateUserResponse, UserDTO } from '../dtos/CreateUserDTO'
import { IUserseRepository } from '../interfaces/IUsersRepository'

export class InMemoryUsersRepository implements IUserseRepository {

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

  public async findByEmail(email: string): Promise<CreateUserResponse | null> {
    return new Promise((resolve) => {
      const user = this.users.find(user => user.email === email)

      if (!user) {
        return resolve(null)
      }

      return resolve(user)
    })
  }

  public async findById(id: string): Promise<Partial<UserDTO> | null> {
    return new Promise((resolve) => {
      const user = this.users.find(user => user.id === id)

      if (!user) {
        return resolve(null)
      }

      return resolve(user)
    })
  }

  public async checkPassword(userPassword: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      return resolve(userPassword === password)
    })
  }
}