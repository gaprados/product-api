import { CreateUserService } from "../app/services/create-user-service"
import { InMemoryUsersRepository } from "../domain/repositories/in-memory-repository"

describe('Create User', () => {
  let usersRepository: InMemoryUsersRepository
  let createUserService: CreateUserService

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserService = new CreateUserService(usersRepository)
  })

  it('should create an user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      confirmation_password: '123456'
    });

    expect(user).toHaveProperty('id')
  })

  it('should not create two users with same email', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      confirmation_password: '123456'
    })

    await expect(createUserService.execute({
      name: 'John Doe 2',
      email: 'johndoe@example.com',
      password: '123456',
      confirmation_password: '123456'
    })).rejects.toThrow(Error)
  })

  it('should not let user create if password is lesser than 6', async () => {
    await expect(createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
      confirmation_password: '1234'
    })).rejects.toThrow(Error)
  })

  it('should not let user create if password and confirm password does not match', async () => {
    await expect(createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      confirmation_password: '123489'
    })).rejects.toThrow(Error)
  })
})