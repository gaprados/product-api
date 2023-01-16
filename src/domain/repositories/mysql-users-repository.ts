import { PrismaClient } from "@prisma/client";
import { prisma } from "../../infra/lib/prisma";
import { CreateUserRequest, CreateUserResponse, UserDTO } from "../dtos/CreateUserDTO";
import { IUserseRepository } from "../interfaces/IUsersRepository";

export class DBUsersRepositoy implements IUserseRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma;
  }

  public async create(data: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, password, email } = data;

    const user = await this.prisma.user.create({
      data: {
        name,
        password,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        created_at: true,
        updated_at: true,
      }
    })

    return user;
  }

  public async findByEmail(email: string): Promise<CreateUserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user;
  }

  public async findById(id: string): Promise<Partial<UserDTO> | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    return user;
  }

  // TODO: Implement this method
  public async checkPassword(userPassword: string, password: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}