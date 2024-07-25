import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product/schema/product.schema';
import { UserSchema } from './users/schema/user.schema';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/crudapp'),
        MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}