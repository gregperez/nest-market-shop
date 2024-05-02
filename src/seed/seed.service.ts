import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}

  async runSeed() {
    await this.insertNewProduct();
    return `SEED EXECUTED!`;
  }

  private async insertNewProduct() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertProducts = [];

    products.forEach((product) => {
      insertProducts.push(this.productsService.create(product));
    });

    await Promise.all(insertProducts);

    return true;
  }
}
