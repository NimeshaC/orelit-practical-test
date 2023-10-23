import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuidv4 } from "uuid";
import { Shop } from "src/shop/entities/shop.entity";
import { User } from "src/user/entities/user.entity";
import { CartItem } from "src/cart/entities/cart-item.entity";
import { Promotion } from "src/promotion/entities/promotion.entity";
import { OrderItem } from "src/order/entities/order-item.entity";

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

  @Column()
  stock_quantity: string;

  @ManyToOne(() => Shop, (shop) => shop.products, { onDelete: "CASCADE" })
  shop: Shop;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @OneToMany(() => Promotion, (promotion) => promotion.product)
  promotions: Promotion[];

  @OneToMany(() => CartItem, (cart_item) => cart_item.product)
  cart_items: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_item: OrderItem[];

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
