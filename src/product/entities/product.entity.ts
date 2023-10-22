import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuidv4 } from "uuid";
import { Shop } from "src/shop/entities/shop.entity";
import { User } from "src/user/entities/user.entity";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  product_id: string;

  @Column()
  product_name: string;

  @Column({ unique: true })
  product_code: string;

  @Column()
  product_image: string;

  @Column()
  product_description: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  discounted_price: string;

  @Column()
  stock_quantity: string;

  @ManyToOne(() => Shop, (shop) => shop.products)
  shop: Shop;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor() {
    this.product_id = uuidv4();
  }
}
