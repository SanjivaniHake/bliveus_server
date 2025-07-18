import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const createdProduct = new this.productModel(productData);
    return createdProduct.save();
  }
  async delete(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) throw new NotFoundException('Product not found');
  }

  async findByCategory(category: string): Promise<Product[]> {
    try {
      return await this.productModel.find({ category }).exec();
    } catch (error) {
      console.error('Error in findByCategory:', error);
      throw error;
    }
  }

  // New search method
  async searchProducts(query: string): Promise<Product[]> {
    if (!query || query.trim() === '') return [];

    const regex = new RegExp(query, 'i'); // case-insensitive regex

    return this.productModel
      .find({
        $or: [{ name: regex }, { description: regex }],
      })
      .exec();
  }
}
