import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProductModel {
  async findMany(): Promise<any> {
    return prisma.product.findMany();
  }

  async findById(id: number): Promise<any> {
    return prisma.product.findUnique({ where: { id } });
  }

  async create(createProduct: any): Promise<any> {
    return prisma.product.create({ data: createProduct });
  }

  async update(id: number, updatedProduct: any): Promise<any> {
    return prisma.product.update({ where: { id }, data: updatedProduct });
  }

  async delete(id: number): Promise<any> {
    return prisma.product.delete({ where: { id } });
  }
}

export default ProductModel;
