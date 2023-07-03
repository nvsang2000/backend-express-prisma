import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserModel {
  async findMany(): Promise<any> {
    return prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<any> {
    return prisma.user.findUnique({ where: { email } });
  }
  
  async findById(id: number): Promise<any> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(username: string, password: string): Promise<any> {
    return prisma.user.create({ data: { username, password } });
  }

  async update(
    id: number,
    username: string,
    email: string
  ): Promise<any> {
    return prisma.user.update({ where: { id }, data: { username, email } });
  }

  async delete(id: number): Promise<any> {
    return prisma.user.delete({ where: { id } });
  }
}

export default UserModel;
