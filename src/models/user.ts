import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserModel {
  async getAllUsers(): Promise<any[]> {
    return prisma.user.findMany();
  }

  async getUserById(id: number): Promise<any | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async createUser(username: string, password: string): Promise<any> {
    return prisma.user.create({ data: { username, password } });
  }

  async updateUser(id: number, username: string, email: string): Promise<any | null> {
    return prisma.user.update({ where: { id }, data: { username, email } });
  }

  async deleteUser(id: number): Promise<any | null> {
    return prisma.user.delete({ where: { id } });
  }
}

export default UserModel;
