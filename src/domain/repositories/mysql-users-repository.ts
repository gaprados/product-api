import { PrismaClient } from "@prisma/client";
import { prisma } from "../../infra/lib/prisma";
import { CreateUserRequest, CreateUserResponse } from "../dtos/CreateUserDTO";
import { IUserseRepository } from "../interfaces/IUsersRepository";

export class MySqlUsersRepository implements IUserseRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = prisma;
  }

  public async findByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })

    return !!user;
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
}