import { PrismaClient } from "@prisma/client";

interface User {
  email?: string,
  username: string,
  displayname?: string,
  isActive: boolean,
  password: string,
  role: string,
  thumbnail: string,
}
const prisma = new PrismaClient();

class UserModel {
  async findMany(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(username: string, password: string): Promise<User> {
    return prisma.user.create({ data: { username, password } });
  }

  async update(
    id: number,
    username: string,
    email: string
  ): Promise<User | null> {
    return prisma.user.update({ where: { id }, data: { username, email } });
  }

  async delete(id: number): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }
}

export default UserModel;
