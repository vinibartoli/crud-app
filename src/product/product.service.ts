/*
https://docs.nestjs.com/providers#services
*/

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDTO } from './dto/product.dto';
import { Model } from 'mongoose';
import { ProductUpdateDTO } from './dto/productUpdate.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<ProductDTO>) {}

    async getAll() {
        return await this.productModel.find().exec()
    }

    async getById(id: string) {
        return await this.productModel.findById(id).exec()
    }

    async create(productDTO: ProductDTO) {
        const { name, ...rest } = productDTO
        const nameExist = await this.findByName(name)

        if(nameExist) {
            throw new ConflictException('Nome já cadastrado')
        }

        const newObj = new this.productModel({
            name,
            ...rest
        })

        return newObj.save()
    }

    async update(id: string, productUpdateDTODTO: ProductUpdateDTO) {
        const { name, ...rest } = productUpdateDTODTO

        const nameExist = await this.productModel.findOne({
            name,
            status: true,
            _id: { $ne: id }
        })
        if(nameExist) {
            throw new ConflictException('Nome já existente')
        }

        const updateObj = {
            name,
            ...rest
        }

        await this.productModel
        .updateOne({ _id: id }, { $set: updateObj })
        .exec();

        return this.getById(id)
    }

    async delete(id: string) {
        return await this.productModel.deleteOne({ _id: id }).exec()
    }

    async findByName(name: string) {
        return this.productModel.findOne({ name }).exec();
    }
}
