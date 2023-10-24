import { Exclude } from "class-transformer";
import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/product/entities/product.entity";
import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("cart_item")
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  cart_item_id: string;

  @Column()
  quantity: string;

  @Column()
  total_price: string;

  @ManyToOne(() => Cart, (cart) => cart.cart_items, { onDelete: "CASCADE" })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cart_items)
  product: Product;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor() {
    this.cart_item_id = uuidv4();
  }
}
