import { UserRepository } from "../domain/repositories/array-users-repository"
import { CreateUserService } from "../infra/services/create-user-service"

describe('Create User', () => {
  let usersRepository: UserRepository
  let createUserService: CreateUserService

  beforeEach(() => {
    usersRepository = new UserRepository()
    createUserService = new CreateUserService(usersRepository)
  })

  it('should create an user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id')
  })

  it('should not create two users with same email', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(createUserService.execute({
      name: 'John Doe 2',
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toThrow(Error)
  })

  it('should not let user create if password is lesser than 6', async () => {
    await expect(createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234'
    })).rejects.toThrow(Error)
  })
})