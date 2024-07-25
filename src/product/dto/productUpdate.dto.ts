import { PartialType } from '@nestjs/mapped-types'
import { ProductDTO } from './product.dto';

export class ProductUpdateDTO extends PartialType(ProductDTO) {}