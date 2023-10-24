import { Exclude } from "class-transformer";
import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Promotion } from "src/promotion/entities/promotion.entity";
import { Shop } from "src/shop/entities/shop.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  role: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => Shop, (shop) => shop.user)
  shops: Shop[];

  @OneToMany(() => Promotion, (promotion) => promotion.user)
  promotions: Promotion[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart;

  constructor() {
    this.user_id = uuidv4();
  }
}
