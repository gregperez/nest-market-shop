import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async runSeed(user: User) {
    await this.insertNewProduct(user);
    return `SEED EXECUTED!`;
  }

  private async insertNewProduct(user: User) {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertProducts = [];

    products.forEach((product) => {
      insertProducts.push(this.productsService.create(product, user));
    });

    await Promise.all(insertProducts);

    return true;
  }
}
