import { Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    return this.productRepo.findOne({
      select: { id: true, name: true, price: true },
      where: { id: id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateResult = await this.productRepo.update(id, updateProductDto);
    if (updateResult.affected > 0) {
      return this.productRepo.findOne({
        select: { id: true, name: true, price: true },
        where: { id: id },
      });
    } else {
      throw new EntityNotFoundError(Product, id);
    }
  }

  async remove(id: number) {
    await this.productRepo.delete(id);
  }
}
