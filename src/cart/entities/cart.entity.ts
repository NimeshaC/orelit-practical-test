import { Exclude } from "class-transformer";
import { User } from "src/user/entities/user.entity";
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CartItem } from "./cart-item.entity";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  cart_id: string;

  @Column({ default: "0" })
  total_quantity: string;

  @Column({ default: "0" })
  total_price: string;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;

  @OneToMany(() => CartItem, (cart_item) => cart_item.cart)
  cart_items: CartItem[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  constructor() {
    this.cart_id = uuidv4();
  }
}
