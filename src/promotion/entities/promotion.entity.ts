import { Exclude } from "class-transformer";
import { Product } from "src/product/entities/product.entity";
import { Shop } from "src/shop/entities/shop.entity";
import { User } from "src/user/entities/user.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("promotion")
export class Promotion {
  @PrimaryGeneratedColumn("uuid")
  promotion_id: string;

  @Column()
  promotion_name: string;

  @Column()
  promotion_description: string;

  @Column()
  promotion_start_date: string;

  @Column()
  promotion_end_date: string;

  @Column()
  discount_percentage: string;

  @ManyToOne(() => Product, (product) => product.promotions, {
    onDelete: "CASCADE",
  })
  product: Product;

  @ManyToOne(() => User, (user) => user.promotions)
  user: User;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor() {
    this.promotion_id = uuidv4();
  }
}
