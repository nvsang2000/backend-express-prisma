import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoryModel {
  async findMany(): Promise<any> {
    return prisma.category.findMany();
  }

  async findById(id: number): Promise<any> {
    return prisma.category.findUnique({ where: { id } });
  }

  async create(createCategory: any): Promise<any> {
    return prisma.category.create({ data: createCategory });
  }

  async update(id: number, updatedCategory: any): Promise<any> {
    return prisma.category.update({ where: { id }, data: updatedCategory });
  }

  async delete(id: number): Promise<any> {
    return prisma.category.delete({ where: { id } });
  }
}

export default CategoryModel;
