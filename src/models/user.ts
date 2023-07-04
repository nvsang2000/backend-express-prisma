import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserModel {
  async findMany(): Promise<any> {
    return prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<any> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<any> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(createUser: any): Promise<any> {
    return prisma.user.create({ data: createUser });
  }

  async update(id: string, updatedUser: any): Promise<any> {
    return prisma.user.update({ where: { id }, data: updatedUser });
  }

  async delete(id: string): Promise<any> {
    return prisma.user.delete({ where: { id } });
  }
}

export default UserModel;
