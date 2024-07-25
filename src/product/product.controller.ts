import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    async getAll() {
        return this.productService.getAll()
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.productService.getById(id)
    }

    @Post()
    async create(@Body() obj: ProductDTO) {
        return this.productService.create(obj);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() obj: ProductDTO) {
        return this.productService.update(id, obj)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.productService.delete(id)
    }
}
